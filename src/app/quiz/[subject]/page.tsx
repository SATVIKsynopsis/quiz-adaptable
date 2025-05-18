import { redirect } from 'next/navigation';
import { getSubjectDetails } from '@/lib/questions';
import { FadeIn } from '../../components/animations/FadeIn';
import { Button } from '../../../components/ui/button';
import { Card } from '@/components/ui/card';


interface Subject {
  title: string;
  description: string;
  topics: string[];
  recommendedFor: string;
  icon: string;
}


interface SubjectPageProps {
  params: Promise<{ subject: string }>;
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subject: subjectParam } = await params; 
  const subject = getSubjectDetails(subjectParam) as Subject | undefined;

  if (!subject) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <Card className="backdrop-blur-md">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-4">{subject.title}</h1>
                  <p className="text-lg opacity-90 mb-6">{subject.description}</p>
                  <div className="space-y-4 mb-8">
                    <div>
                      <h3 className="font-semibold text-lg">Topics Covered:</h3>
                      <ul className="list-disc list-inside opacity-90">
                        {subject.topics.map((topic, index) => (
                          <li key={index}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Recommended For:</h3>
                      <p className="opacity-90">{subject.recommendedFor}</p>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="w-full md:w-auto px-8 py-3 text-lg"
                    glow
                  >
                    <a href={`/quiz/${subjectParam}/play`}>Start {subject.title} Quiz</a>
                  </Button>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl"></div>
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <div className="text-8xl">{subject.icon}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}