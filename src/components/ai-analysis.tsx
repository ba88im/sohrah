"use client";
import React, { useEffect, useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from './ui/button';
import { Brain, RotateCw } from 'lucide-react';

export function AiAnalysis() {

    // Specify the type of the state
    const [analysis, setAnalysis] = useState<any[]>([]); // Initialize with the specific type


    const fetchAnalysis = async () => {
        const response = await fetch('/api/generate-analysis');
        if (response.ok) {
            const analysis = await response.json(); // Get the full response JSON
            console.log(analysis);
            setAnalysis(analysis)
        } else {
            console.error('Failed to fetch analysis');
        }
    };


    useEffect(() => {
        fetchAnalysis();
    }, []); // Runs only once on mount
    

    return (
        <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>AI Analysis</CardTitle>
                <CardDescription>Quickly review your progress with an AI analysis!</CardDescription>
            </div>

          <Button variant="outline" onClick={() => fetchAnalysis()}>
            Generate 
            <Brain className='w-4 h-4 ml-2' />
          </Button>

         </div>
      </CardHeader>
          <CardContent>
            {analysis}
          </CardContent>
        </Card>
      );
}
