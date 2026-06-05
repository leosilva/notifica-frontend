import { GraduationCap } from 'lucide-react';
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from '../components/ui/card';
import { ModeToggle } from '../components/mode-toggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import logopng from '../assets/logo.png'

export default function LoginPage() {
  return (
    <div className="relative w-full h-screen flex justify-center items-center flex-col">
      <div className="absolute top-4 right-4 m-2">
        <ModeToggle />
      </div>
      <main className="w-[30%]">
        <Card className="flex justify-center w-full shadow-[0_0_20px_10px_rgba(0,0,0,0.3)] border-0 bg-card/95 backdrop-blur-xl shadow-emerald-900/15  pulse-glow p-4">
          <CardHeader>
            <div className="flex justify-center w-auto">
              <GraduationCap
                className="bg-green-500 p-4 rounded-lg   text-white"
                size={75}
              />
            </div>
            <CardTitle className="text-3xl font-bold p-4 text-emerald-400 flex justify-center h-20">

              <img src={logopng} alt="Logotipo Notifica" />
            </CardTitle>
            <CardDescription className="text-xl flex justify-center">
              Sistema integrado de comunicação acadêmica
            </CardDescription>
          </CardHeader>
          <CardContent>
               <Tabs defaultValue="estudante" className="w-full bg-emerald-50
               ">
      <TabsList className="w-full bg-emerald-50" variant='default'>
        <TabsTrigger value="estudante" className="data-[state=inactive]: bg-amber-50">Estudante</TabsTrigger>
        <TabsTrigger value="administrador">administrador</TabsTrigger>
      </TabsList>
      <TabsContent value="estudante">
        <Card className='bg-transparent ring-0'>
          <CardHeader >
            <CardTitle>Estudante</CardTitle>
            <CardDescription>
              View your key metrics and recent project activity. Track progress
              across all your active projects.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You have 12 active projects and 3 pending tasks.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="administrador">
        <Card className='bg-transparent border-0 ring-0'>
          <CardHeader>
            <CardTitle>administrador</CardTitle>
            <CardDescription>
              Track performance and user engagement metrics. Monitor trends and
              identify growth opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Page views are up 25% compared to last month.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>
              Generate and download your detailed reports. Export data in
              multiple formats for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You have 5 reports ready and available to export.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
