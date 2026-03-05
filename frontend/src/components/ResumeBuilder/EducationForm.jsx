"use client"
import React from "react";
import PropTypes from "prop-types";
import { Button } from "../ui/Button.jsx";
import { Input } from "../ui/Input.jsx";
import { Label } from "../ui/Label.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx";
import { Plus, Trash2, GripVertical } from "lucide-react";

export function EducationForm({ data = [], onUpdate = () => {} }) {
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      honors: "",
    };
    onUpdate([...data, newEducation]);
  };

  const removeEducation = (id) => {
    onUpdate(data.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id, field, value) => {
    onUpdate(
      data.map((edu) =>
        edu.id === id
          ? {
              ...edu,
              [field]: value,
            }
          : edu
      )
    );
  };

  return (
    <div className="space-y-6 ">
      {data.length === 0 && (
        <Card className="bg-gray-100 shadow-md dark:bg-gray-800">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">No education added yet</p>
            <Button
              onClick={addEducation}
              className="bg-purple-600 dark:bg-purple-800 text-white  hover:bg-purple-500 dark:hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your Education
            </Button>
          </CardContent>
        </Card>
      )}

      {data.map((education, index) => (
        <Card key={education.id} className="bg-gray-100 dark:bg-gray-900 shadow-md rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 dark:text-gray-400" />
                <CardTitle className="text-base  dark:text-gray-100">
                  Education #{index + 1}
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(education.id)}
                className="text-gray-800 dark:text-gray-200"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Institution Name *</Label>
                <Input
                  value={education.institution}
                  onChange={(e) =>
                    updateEducation(education.id, "institution", e.target.value)
                  }
                  placeholder="Harvard University"
                  required
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Degree *</Label>
                <Input
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(education.id, "degree", e.target.value)
                  }
                  placeholder="Bachelor of Science"
                  required
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Field of Study *</Label>
              <Input
                value={education.field}
                onChange={(e) =>
                  updateEducation(education.id, "field", e.target.value)
                }
                placeholder="Computer Science"
                required
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Start Date</Label>
                <Input
                  type="month"
                  value={education.startDate}
                  onChange={(e) =>
                    updateEducation(education.id, "startDate", e.target.value)
                  }
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">End Date</Label>
                <Input
                  type="month"
                  value={education.endDate}
                  onChange={(e) =>
                    updateEducation(education.id, "endDate", e.target.value)
                  }
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">GPA (Optional)</Label>
                <Input
                  value={education.gpa || ""}
                  onChange={(e) =>
                    updateEducation(education.id, "gpa", e.target.value)
                  }
                  placeholder="3.8/4.0"
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Honors/Awards (Optional)</Label>
                <Input
                  value={education.honors || ""}
                  onChange={(e) =>
                    updateEducation(education.id, "honors", e.target.value)
                  }
                  placeholder="Magna Cum Laude"
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length > 0 && (
        <Button
          onClick={addEducation}
          variant="outline"
          className="w-full bg-transparent text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:text-white bg-purple-700 text-white hover:bg-purple-500 dark:bg-purple-800 dark:hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2 " />
          Add Another Education
        </Button>
      )}
    </div>
  );
}

EducationForm.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      institution: PropTypes.string,
      degree: PropTypes.string,
      field: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      gpa: PropTypes.string,
      honors: PropTypes.string,
    })
  ),
  onUpdate: PropTypes.func,
};
