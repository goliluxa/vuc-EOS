import React, { useState } from 'react';
import { courseService } from '../../../services/courseService';
import { CadetCoursesList } from './CadetCoursesList';
import { CadetCourseDetail } from './CadetCourseDetail';

interface CadetCoursesSectionProps {
  selectedCourseId?: string | null;
  onSelectCourse?: (courseId: string | null) => void;
}

export const CadetCoursesSection: React.FC<CadetCoursesSectionProps> = ({
  selectedCourseId: controlledCourseId,
  onSelectCourse: controlledOnSelectCourse,
}) => {
  const [internalCourseId, setInternalCourseId] = useState<string | null>(null);

  const selectedCourseId =
    controlledCourseId !== undefined ? controlledCourseId : internalCourseId;

  const handleSelectCourse = (courseId: string | null) => {
    if (controlledOnSelectCourse) {
      controlledOnSelectCourse(courseId);
    } else {
      setInternalCourseId(courseId);
    }
  };

  const courses = courseService.getCadetCourses();
  const selectedCourse = selectedCourseId
    ? courses.find((c) => c.id === selectedCourseId)
    : null;

  if (selectedCourse) {
    return (
      <CadetCourseDetail
        course={selectedCourse}
        onBack={() => handleSelectCourse(null)}
      />
    );
  }

  return (
    <CadetCoursesList
      courses={courses}
      onSelectCourse={(id) => handleSelectCourse(id)}
    />
  );
};
