'use client';

import { WeatherData } from '@/types/weather';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { WeatherInfo } from '@/components/weather/weather-info';

import { useState } from 'react';
import { X } from 'lucide-react';

export function WeatherDisplay() {
    const [uuid, setUUID] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<{
        success: boolean;
        message: string;
        data?: WeatherData;
    } | null>(null);

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResult(null);

        try {
            const response = await fetch(`http://localhost:8000/weather/${uuid}`);

            if (response.ok) {
                const data = await response.json();
                setResult({
                    success: true,
                    message: 'Lookup Weather by UUID successfully!',
                    data,
                });
            } else {
                const errorData = await response.json();
                setResult({
                    success: false,
                    message: errorData.detail || 'Failed to submit weather request',
                });
            }
        } catch {
            setResult({
                success: false,
                message: 'Network error: Could not connect to the server',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className='mx-auto w-full max-w-md'>
            <CardHeader>
                <CardTitle>Weather Data Lookup</CardTitle>
                <CardDescription>Lookup weather data by UUID</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='uuid'>UUID</Label>
                        <Input
                            id='uuid'
                            name='uuid'
                            type='text'
                            placeholder='e.g., xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                            value={uuid}
                            onChange={(e) => {
                                setUUID(e.target.value);
                            }}
                            required
                        />
                        {uuid && !uuidRegex.test(uuid) ? (
                            <div className='flex items-center gap-2 rounded-md border border-red-500 bg-red-900/20 p-2 text-sm font-medium text-red-500'>
                                <X size={16} /> Invalid UUID
                            </div>
                        ) : null}
                    </div>

                    <Button type='submit' className='w-full' disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Lookup Request'}
                    </Button>

                    {result && (
                        <div
                            className={`rounded-md p-3 ${
                                result.success
                                    ? 'border border-green-500 bg-green-900/20 text-green-500'
                                    : 'border border-red-500 bg-red-900/20 text-red-500'
                            }`}>
                            <p className='text-sm font-medium'>{result.message}</p>
                        </div>
                    )}

                    {result && result.success && result.data ? (
                        <WeatherInfo {...{ uuid, ...result.data }} />
                    ) : null}
                </form>
            </CardContent>
        </Card>
    );
}
