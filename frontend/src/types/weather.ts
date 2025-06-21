export type WeatherData = {
    date: string;
    location: string;
    notes: string;
    weather_data: {
        request: {
            type: string;
            query: string;
            language: string;
            unit: string;
        };
        location: {
            name: string;
            country: string;
            region: string;
            lat: string;
            lon: string;
            timezone_id: string;
            localtime: string;
            localtime_epoch: number;
            utc_offset: string;
        };
        current: {
            observation_time: string;
            temperature: number;
            weather_code: number;
            weather_icons: string[];
            weather_descriptions: string[];
            astro: {
                sunrise: string;
                sunset: string;
                moonrise: string;
                moonset: string;
                moon_phase: string;
                moon_illumination: number;
            };
            air_quality: {
                co: string;
                no2: string;
                o3: string;
                so2: string;
                pm2_5: string;
                pm10: string;
                'us-epa-index': string;
                'gb-defra-index': string;
            };
            wind_speed: number;
            wind_degree: number;
            wind_dir: string;
            pressure: number;
            precip: number;
            humidity: number;
            cloudcover: number;
            feelslike: number;
            uv_index: number;
            visibility: number;
            is_day: string;
        };
    };
};
