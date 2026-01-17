
CREATE TABLE IF NOT EXISTS participants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255),
    city VARCHAR(100),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'new',
    call_result VARCHAR(50),
    call_date TIMESTAMP,
    score INTEGER DEFAULT 0,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS call_history (
    id SERIAL PRIMARY KEY,
    participant_id INTEGER,
    call_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration INTEGER,
    status VARCHAR(50) NOT NULL,
    recording_url TEXT,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS bot_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_participants_phone ON participants(phone);
CREATE INDEX IF NOT EXISTS idx_participants_status ON participants(status);
CREATE INDEX IF NOT EXISTS idx_call_history_participant ON call_history(participant_id);
CREATE INDEX IF NOT EXISTS idx_call_history_date ON call_history(call_date);

INSERT INTO bot_settings (setting_key, setting_value) VALUES
('voice_text', 'Здравствуйте, {name}! Вы участвуете в розыгрыше от нашей компании. Для подтверждения участия нажмите 1.'),
('call_from_number', '+7990221178'),
('auto_call_enabled', 'true'),
('call_volume', '75'),
('call_speed', '50')
ON CONFLICT (setting_key) DO NOTHING;
