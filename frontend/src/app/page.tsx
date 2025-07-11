import { WeatherDisplay } from '@/components/weather/weather-display';
import { WeatherForm } from '@/components/weather/weather-form';

export default function Home() {
    return (
        <div className='bg-background min-h-screen p-8'>
            <div className='mx-auto max-w-4xl'>
                <div className='mb-8 text-center'>
                    <h1 className='mb-2 text-4xl font-bold tracking-tight'>Weather System</h1>
                    <p className='text-muted-foreground text-lg'>
                        Submit weather requests and retrieve stored results
                    </p>
                </div>

                <div className='grid gap-8 md:grid-cols-2'>
                    {/* Weather Form Section */}
                    <div className='flex flex-col items-center justify-start'>
                        <h2 className='mb-4 text-2xl font-semibold'>Submit Weather Request</h2>
                        <WeatherForm />
                    </div>

                    <div className='flex flex-col items-center justify-start'>
                        <h2 className='mb-4 text-2xl font-semibold'>Lookup Weather Data</h2>
                        <WeatherDisplay />
                    </div>
                </div>
            </div>
        </div>
    );
}
