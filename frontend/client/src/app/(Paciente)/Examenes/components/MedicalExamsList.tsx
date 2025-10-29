'use client';

import { MedicalExam } from '@/types';

interface MedicalExamsListProps {
  filteredExams: MedicalExam[];
}

export default function MedicalExamsList({
  filteredExams,
}: MedicalExamsListProps) {
  return (
    <>
      <section className='medical-exams-list'>
        {filteredExams.map(exam => (
          <article key={exam.id}>
            <h2>{exam.title}</h2>
            <time dateTime={exam.date}>
              {exam.date} - {exam.doctor}
            </time>
            <div className='exam-actions'>
              <button
                className='view-button'
                disabled={exam.status === 'Pendientes'}
              >
                Ver Detalles
              </button>
              <button
                className='download-button'
                disabled={exam.status === 'Pendientes'}
              >
                Descargar
              </button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
