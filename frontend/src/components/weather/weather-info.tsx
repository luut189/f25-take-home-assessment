import { WeatherData } from '@/types/weather';
import { Cloud, Droplets, Wind, Gauge, Thermometer, Sunrise, Sunset, FileText } from 'lucide-react';

interface WeatherInfoProps extends WeatherData {
    uuid: string;
}

export function WeatherInfo({ uuid, date, notes, weather_data }: WeatherInfoProps) {
    const getAirQualityLabel = (index: string) => {
        const labels = {
            '1': 'Good',
            '2': 'Moderate',
            '3': 'Unhealthy for Sensitive Groups',
            '4': 'Unhealthy',
            '5': 'Very Unhealthy',
            '6': 'Hazardous',
        };
        return labels[index as keyof typeof labels] || 'Unknown';
    };

    const getAirQualityColor = (index: string) => {
        const colors = {
            '1': 'bg-green-500',
            '2': 'bg-yellow-500',
            '3': 'bg-orange-500',
            '4': 'bg-red-500',
            '5': 'bg-purple-500',
            '6': 'bg-red-900',
        };
        return colors[index as keyof typeof colors] || 'bg-gray-500';
    };

    return (
        <>
            <div className='rounded-lg bg-gray-700 p-3'>
                <div className='mb-2 flex items-center gap-2'>
                    <FileText className='h-4 w-4 text-blue-400' />
                    <span className='text-sm font-medium text-white'>Request ID: {uuid}</span>
                    <span className='font-mono text-xs text-blue-300'>{}</span>
                </div>
                <div className='text-xs text-gray-400'>
                    {weather_data.location.name}, {weather_data.location.region} • {date}
                </div>
            </div>

            {notes ? (
                <div className='rounded-lg bg-gray-700 p-3 font-medium'>
                    Notes: <span className='font-normal'>{notes}</span>
                </div>
            ) : null}

            <div className='rounded-lg bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 text-center'>
                <div className='mb-3 flex items-center justify-center gap-3'>
                    <Cloud className='h-8 w-8 text-blue-400' />
                    <div>
                        <div className='text-3xl font-light text-white'>
                            {weather_data.current.temperature}&deg;C
                        </div>
                        <div className='text-sm text-gray-300'>
                            {weather_data.current.weather_descriptions}
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
                <div className='rounded-lg bg-gray-700 p-3'>
                    <div className='mb-1 flex items-center gap-2'>
                        <Droplets className='h-3 w-3 text-blue-400' />
                        <span className='text-xs text-gray-400'>Humidity</span>
                    </div>
                    <div className='text-lg font-semibold text-white'>
                        {weather_data.current.humidity}%
                    </div>
                </div>

                <div className='rounded-lg bg-gray-700 p-3'>
                    <div className='mb-1 flex items-center gap-2'>
                        <Wind className='h-3 w-3 text-blue-400' />
                        <span className='text-xs text-gray-400'>Wind</span>
                    </div>
                    <div className='text-lg font-semibold text-white'>
                        {weather_data.current.wind_speed} km/h
                    </div>
                </div>

                <div className='rounded-lg bg-gray-700 p-3'>
                    <div className='mb-1 flex items-center gap-2'>
                        <Gauge className='h-3 w-3 text-blue-400' />
                        <span className='text-xs text-gray-400'>Pressure</span>
                    </div>
                    <div className='text-lg font-semibold text-white'>
                        {weather_data.current.pressure} mb
                    </div>
                </div>

                <div className='rounded-lg bg-gray-700 p-3'>
                    <div className='mb-1 flex items-center gap-2'>
                        <Thermometer className='h-3 w-3 text-blue-400' />
                        <span className='text-xs text-gray-400'>Air Quality</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <div
                            className={`h-2 w-2 rounded-full ${getAirQualityColor(weather_data.current.air_quality['us-epa-index'])}`}></div>
                        <span className='text-sm font-medium text-white'>
                            {getAirQualityLabel(weather_data.current.air_quality['us-epa-index'])}
                        </span>
                    </div>
                </div>
            </div>

            {/* Compact Sun Times */}
            <div className='rounded-lg bg-gray-700 p-3'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex items-center gap-2'>
                        <Sunrise className='h-4 w-4 text-orange-500' />
                        <div>
                            <div className='text-xs text-gray-400'>Sunrise</div>
                            <div className='text-sm text-white'>
                                {weather_data.current.astro.sunrise}
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Sunset className='h-4 w-4 text-orange-600' />
                        <div>
                            <div className='text-xs text-gray-400'>Sunset</div>
                            <div className='text-sm text-white'>
                                {weather_data.current.astro.sunset}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
