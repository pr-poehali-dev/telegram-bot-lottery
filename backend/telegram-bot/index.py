import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import requests

def handler(event: dict, context) -> dict:
    '''Telegram бот для управления розыгрышем с автоматическими звонками'''
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            update = body
            
            if 'message' in update:
                message = update['message']
                chat_id = message['chat']['id']
                text = message.get('text', '')
                
                if text == '/start':
                    send_main_menu(chat_id)
                elif text == '/menu':
                    send_main_menu(chat_id)
                elif text == '📤 Загрузить участников':
                    handle_upload_menu(chat_id)
                elif text == '👥 Список участников':
                    handle_participants_list(chat_id)
                elif text == '📞 Управление звонками':
                    handle_calls_menu(chat_id)
                elif text == '📊 Статистика':
                    handle_statistics(chat_id)
                elif text == '⚙️ Настройки':
                    handle_settings(chat_id)
                elif text == '📥 Экспорт данных':
                    handle_export(chat_id)
                else:
                    send_message(chat_id, 'Используйте меню для выбора действия.')
            
            elif 'callback_query' in update:
                callback = update['callback_query']
                chat_id = callback['message']['chat']['id']
                data = callback['data']
                
                handle_callback(chat_id, data, callback['id'])
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'ok': True})
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)})
            }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }


def get_db_connection():
    return psycopg2.connect(
        os.environ['DATABASE_URL'],
        cursor_factory=RealDictCursor,
        options=f"-c search_path={os.environ['MAIN_DB_SCHEMA']}"
    )


def send_message(chat_id: int, text: str, reply_markup=None):
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    payload = {
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }
    
    if reply_markup:
        payload['reply_markup'] = reply_markup
    
    requests.post(url, json=payload)


def send_main_menu(chat_id: int):
    keyboard = {
        'keyboard': [
            [{'text': '📤 Загрузить участников'}, {'text': '👥 Список участников'}],
            [{'text': '📞 Управление звонками'}, {'text': '📊 Статистика'}],
            [{'text': '⚙️ Настройки'}, {'text': '📥 Экспорт данных'}]
        ],
        'resize_keyboard': True,
        'one_time_keyboard': False
    }
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) as total FROM participants")
    total = cursor.fetchone()['total']
    
    cursor.execute("SELECT COUNT(*) as called FROM participants WHERE status = 'called'")
    called = cursor.fetchone()['called']
    
    cursor.execute("SELECT COUNT(*) as success FROM participants WHERE call_result = 'success'")
    success = cursor.fetchone()['success']
    
    conn.close()
    
    text = f"""🤖 <b>Бот для управления розыгрышем</b>

📊 <b>Статистика:</b>
👥 Всего участников: {total}
📞 Обзвонено: {called}
✅ Успешных ответов: {success}

Выберите действие из меню:"""
    
    send_message(chat_id, text, keyboard)


def handle_upload_menu(chat_id: int):
    keyboard = {
        'inline_keyboard': [
            [{'text': '📄 Инструкция по формату', 'callback_data': 'upload_instruction'}],
            [{'text': '📥 Скачать шаблон CSV', 'callback_data': 'download_template'}],
            [{'text': '🔙 Назад в меню', 'callback_data': 'main_menu'}]
        ]
    }
    
    text = """📤 <b>Загрузка участников</b>

Отправьте файл CSV или Excel со следующими столбцами:
• Имя (обязательно)
• Телефон (обязательно)
• Email (опционально)
• Город (опционально)

Формат телефона: +79991234567 или 89991234567"""
    
    send_message(chat_id, text, keyboard)


def handle_participants_list(chat_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT name, phone, city, status, call_result 
        FROM participants 
        ORDER BY registration_date DESC 
        LIMIT 10
    """)
    
    participants = cursor.fetchall()
    conn.close()
    
    if not participants:
        text = "📋 Список участников пуст. Загрузите файл с участниками."
    else:
        text = "👥 <b>Последние 10 участников:</b>\n\n"
        for p in participants:
            status_emoji = '✅' if p['call_result'] == 'success' else '⏳' if p['status'] == 'pending' else '📞'
            text += f"{status_emoji} <b>{p['name']}</b>\n"
            text += f"   📱 {p['phone']}\n"
            if p['city']:
                text += f"   🏙 {p['city']}\n"
            text += "\n"
    
    keyboard = {
        'inline_keyboard': [
            [{'text': '📊 Показать всех', 'callback_data': 'show_all_participants'}],
            [{'text': '🔙 Назад в меню', 'callback_data': 'main_menu'}]
        ]
    }
    
    send_message(chat_id, text, keyboard)


def handle_calls_menu(chat_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT setting_value FROM bot_settings WHERE setting_key = 'auto_call_enabled'")
    auto_enabled = cursor.fetchone()['setting_value'] == 'true'
    
    cursor.execute("SELECT COUNT(*) as pending FROM participants WHERE status = 'pending' OR status = 'new'")
    pending = cursor.fetchone()['pending']
    
    conn.close()
    
    status_text = "🟢 Включен" if auto_enabled else "🔴 Выключен"
    
    keyboard = {
        'inline_keyboard': [
            [{'text': '▶️ Начать обзвон', 'callback_data': 'start_calling'}],
            [{'text': '⏸ Остановить обзвон', 'callback_data': 'stop_calling'}],
            [{'text': '🎙 Настроить озвучку', 'callback_data': 'voice_settings'}],
            [{'text': '📋 История звонков', 'callback_data': 'call_history'}],
            [{'text': '🔙 Назад в меню', 'callback_data': 'main_menu'}]
        ]
    }
    
    text = f"""📞 <b>Управление звонками</b>

Статус: {status_text}
⏳ Ожидают звонка: {pending}
📞 Звонки с номера: +7990221178

Выберите действие:"""
    
    send_message(chat_id, text, keyboard)


def handle_statistics(chat_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) as total FROM participants")
    total = cursor.fetchone()['total']
    
    cursor.execute("SELECT COUNT(*) as called FROM participants WHERE status = 'called'")
    called = cursor.fetchone()['called']
    
    cursor.execute("SELECT COUNT(*) as success FROM call_history WHERE status = 'success'")
    success = cursor.fetchone()['success']
    
    cursor.execute("SELECT COUNT(*) as no_answer FROM call_history WHERE status = 'no_answer'")
    no_answer = cursor.fetchone()['no_answer']
    
    cursor.execute("SELECT AVG(duration) as avg_duration FROM call_history WHERE duration > 0")
    result = cursor.fetchone()
    avg_duration = int(result['avg_duration'] or 0)
    
    conn.close()
    
    success_rate = round((success / called * 100) if called > 0 else 0, 1)
    
    text = f"""📊 <b>Статистика розыгрыша</b>

👥 <b>Участники:</b>
   Всего: {total}
   Обзвонено: {called}
   Ожидают: {total - called}

📞 <b>Звонки:</b>
   ✅ Успешные: {success}
   ❌ Не ответили: {no_answer}
   📈 Процент ответов: {success_rate}%

⏱ <b>Средняя длительность:</b> {avg_duration} сек"""
    
    keyboard = {
        'inline_keyboard': [
            [{'text': '📥 Экспортировать отчет', 'callback_data': 'export_report'}],
            [{'text': '🔙 Назад в меню', 'callback_data': 'main_menu'}]
        ]
    }
    
    send_message(chat_id, text, keyboard)


def handle_settings(chat_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT setting_key, setting_value FROM bot_settings")
    settings = {row['setting_key']: row['setting_value'] for row in cursor.fetchall()}
    
    conn.close()
    
    text = f"""⚙️ <b>Настройки бота</b>

🎙 <b>Текст озвучки:</b>
{settings.get('voice_text', 'Не настроено')}

🔊 <b>Громкость:</b> {settings.get('call_volume', '75')}%
⚡ <b>Скорость речи:</b> {settings.get('call_speed', '50')}%
📞 <b>Номер для звонков:</b> {settings.get('call_from_number', '+7990221178')}"""
    
    keyboard = {
        'inline_keyboard': [
            [{'text': '✏️ Изменить текст', 'callback_data': 'edit_voice_text'}],
            [{'text': '🔊 Настроить громкость', 'callback_data': 'edit_volume'}],
            [{'text': '🔙 Назад в меню', 'callback_data': 'main_menu'}]
        ]
    }
    
    send_message(chat_id, text, keyboard)


def handle_export(chat_id: int):
    text = """📥 <b>Экспорт данных</b>

Выберите формат экспорта:"""
    
    keyboard = {
        'inline_keyboard': [
            [{'text': '📄 CSV файл', 'callback_data': 'export_csv'}],
            [{'text': '📊 Excel файл', 'callback_data': 'export_excel'}],
            [{'text': '📋 Текстовый отчет', 'callback_data': 'export_text'}],
            [{'text': '🔙 Назад в меню', 'callback_data': 'main_menu'}]
        ]
    }
    
    send_message(chat_id, text, keyboard)


def handle_callback(chat_id: int, data: str, callback_id: str):
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    
    requests.post(
        f"https://api.telegram.org/bot{bot_token}/answerCallbackQuery",
        json={'callback_query_id': callback_id}
    )
    
    if data == 'main_menu':
        send_main_menu(chat_id)
    elif data == 'start_calling':
        send_message(chat_id, '▶️ Обзвон запущен! Звонки начнутся с номера +7990221178')
    elif data == 'stop_calling':
        send_message(chat_id, '⏸ Обзвон остановлен.')
    elif data == 'voice_settings':
        send_message(chat_id, '🎙 Отправьте новый текст озвучки. Используйте {name} для имени участника.')
    elif data == 'call_history':
        show_call_history(chat_id)
    elif data == 'export_csv':
        send_message(chat_id, '📄 Генерация CSV файла...')
    else:
        send_message(chat_id, 'Функция в разработке.')


def show_call_history(chat_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT ch.call_date, p.name, p.phone, ch.status, ch.duration
        FROM call_history ch
        JOIN participants p ON ch.participant_id = p.id
        ORDER BY ch.call_date DESC
        LIMIT 10
    """)
    
    history = cursor.fetchall()
    conn.close()
    
    if not history:
        text = "📋 История звонков пуста."
    else:
        text = "📞 <b>Последние 10 звонков:</b>\n\n"
        for call in history:
            status_emoji = '✅' if call['status'] == 'success' else '❌'
            duration = f"{call['duration']}с" if call['duration'] else '-'
            text += f"{status_emoji} <b>{call['name']}</b> ({call['phone']})\n"
            text += f"   ⏱ {duration}\n\n"
    
    send_message(chat_id, text)
