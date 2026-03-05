// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Plus, Trash2, GripVertical, X } from "lucide-react";

// export function ProjectsForm({ data = [], onUpdate }) {
//   const [newTechnology, setNewTechnology] = useState({});

//   const addProject = () => {
//     const newProject = {
//       id: Date.now().toString(),
//       name: "",
//       description: "",
//       technologies: [],
//       link: "",
//       startDate: "",
//       endDate: "",
//     };
//     onUpdate([...data, newProject]);
//   };

//   const removeProject = (id) => {
//     onUpdate(data.filter((project) => project.id !== id));
//   };

//   const updateProject = (id, field, value) => {
//     onUpdate(
//       data.map((project) =>
//         project.id === id
//           ? {
//               ...project,
//               [field]: value,
//             }
//           : project
//       )
//     );
//   };

//   const addTechnology = (projectId) => {
//     const tech = newTechnology[projectId]?.trim();
//     if (tech) {
//       const project = data.find((p) => p.id === projectId);
//       if (project) {
//         updateProject(projectId, "technologies", [...project.technologies, tech]);
//         setNewTechnology({ ...newTechnology, [projectId]: "" });
//       }
//     }
//   };

//   const removeTechnology = (projectId, index) => {
//     const project = data.find((p) => p.id === projectId);
//     if (project) {
//       updateProject(
//         projectId,
//         "technologies",
//         project.technologies.filter((_, i) => i !== index)
//       );
//     }
//   };

//   const handleTechnologyKeyPress = (e, projectId) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       addTechnology(projectId);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Card className="bg-muted/30">
//         <CardHeader>
//           <CardTitle className="text-base">Projects Section (Optional)</CardTitle>
//         </CardHeader>
//         <CardContent className="text-sm text-muted-foreground space-y-2">
//           <p>• Showcase personal projects, open source contributions, or side projects</p>
//           <p>• Include technologies used and links to live demos or repositories</p>
//           <p>• Focus on projects that demonstrate relevant skills for your target role</p>
//         </CardContent>
//       </Card>

//       {data.length === 0 && (
//         <Card className="bg-muted/30">
//           <CardContent className="pt-6 text-center">
//             <p className="text-muted-foreground mb-4">No projects added yet</p>
//             <Button onClick={addProject}>
//               <Plus className="h-4 w-4 mr-2" />
//               Add Your First Project
//             </Button>
//           </CardContent>
//         </Card>
//       )}

//       {data.map((project, index) => (
//         <Card key={project.id}>
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <GripVertical className="h-4 w-4 text-muted-foreground" />
//                 <CardTitle className="text-base">Project #{index + 1}</CardTitle>
//               </div>
//               <Button variant="ghost" size="sm" onClick={() => removeProject(project.id)}>
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Project Name *</Label>
//                 <Input
//                   value={project.name}
//                   onChange={(e) => updateProject(project.id, "name", e.target.value)}
//                   placeholder="E-commerce Website"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Project Link (Optional)</Label>
//                 <Input
//                   value={project.link || ""}
//                   onChange={(e) => updateProject(project.id, "link", e.target.value)}
//                   placeholder="https://github.com/username/project"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Project Description *</Label>
//               <Textarea
//                 value={project.description}
//                 onChange={(e) => updateProject(project.id, "description", e.target.value)}
//                 placeholder="Built a full-stack e-commerce platform..."
//                 className="min-h-[80px]"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Start Date</Label>
//                 <Input
//                   type="month"
//                   value={project.startDate}
//                   onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>End Date</Label>
//                 <Input
//                   type="month"
//                   value={project.endDate}
//                   onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="space-y-4">
//               <Label>Technologies Used</Label>
//               <div className="flex space-x-2">
//                 <Input
//                   value={newTechnology[project.id] || ""}
//                   onChange={(e) =>
//                     setNewTechnology({
//                       ...newTechnology,
//                       [project.id]: e.target.value,
//                     })
//                   }
//                   onKeyPress={(e) => handleTechnologyKeyPress(e, project.id)}
//                   placeholder="e.g., React, Node.js, MongoDB"
//                   className="flex-1"
//                 />
//                 <Button
//                   type="button"
//                   onClick={() => addTechnology(project.id)}
//                   disabled={!newTechnology[project.id]?.trim()}
//                 >
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>

//               {project.technologies.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {project.technologies.map((tech, techIndex) => (
//                     <Badge key={techIndex} variant="secondary" className="text-sm">
//                       {tech}
//                       <button
//                         onClick={() => removeTechnology(project.id, techIndex)}
//                         className="ml-2 hover:text-destructive"
//                         type="button"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </Badge>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       ))}

//       {data.length > 0 && (
//         <Button onClick={addProject} variant="outline" className="w-full bg-transparent">
//           <Plus className="h-4 w-4 mr-2" />
//           Add Another Project
//         </Button>
//       )}
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Plus, Trash2, GripVertical, X } from "lucide-react";

export function ProjectsForm({ data = [], onUpdate }) {
  const [newTechnology, setNewTechnology] = useState({});

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      startDate: "",
      endDate: "",
    };
    onUpdate([...data, newProject]);
  };

  const removeProject = (id) => {
    onUpdate(data.filter((project) => project.id !== id));
  };

  const updateProject = (id, field, value) => {
    onUpdate(
      data.map((project) =>
        project.id === id
          ? {
              ...project,
              [field]: value,
            }
          : project
      )
    );
  };

  const addTechnology = (projectId) => {
    const tech = newTechnology[projectId]?.trim();
    if (tech) {
      const project = data.find((p) => p.id === projectId);
      if (project) {
        updateProject(projectId, "technologies", [...project.technologies, tech]);
        setNewTechnology({ ...newTechnology, [projectId]: "" });
      }
    }
  };

  const removeTechnology = (projectId, index) => {
    const project = data.find((p) => p.id === projectId);
    if (project) {
      updateProject(
        projectId,
        "technologies",
        project.technologies.filter((_, i) => i !== index)
      );
    }
  };

  const handleTechnologyKeyPress = (e, projectId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnology(projectId);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-base text-gray-800 dark:text-gray-100">
            Projects Section (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <p>• Showcase personal projects, open source contributions, or side projects</p>
          <p>• Include technologies used and links to live demos or repositories</p>
          <p>• Focus on projects that demonstrate relevant skills for your target role</p>
        </CardContent>
      </Card>

      {data.length === 0 && (
        <Card className="bg-white bg-gray-100 shadow-md dark:bg-gray-800 dark:bg-gray-900">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">No projects added yet</p>
            <Button onClick={addProject} className={'bg-purple-600 text-white hover:bg-purple-500 dark:bg-purple-900 dark:hover:bg-purple-800'}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}

      {data.map((project, index) => (
        <Card key={project.id} className="bg-white dark:bg-gray-900 ">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <CardTitle className="text-base text-gray-800 dark:text-gray-100">
                  Project #{index + 1}
                </CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeProject(project.id)}>
                <Trash2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-800 dark:text-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Project Name *</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(project.id, "name", e.target.value)}
                  placeholder="E-commerce Website"
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Project Link (Optional)</Label>
                <Input
                  value={project.link || ""}
                  onChange={(e) => updateProject(project.id, "link", e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Project Description *</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, "description", e.target.value)}
                placeholder="Built a full-stack e-commerce platform..."
                className="min-h-[80px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Start Date</Label>
                <Input
                  type="month"
                  value={project.startDate}
                  onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">End Date</Label>
                <Input
                  type="month"
                  value={project.endDate}
                  onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-gray-700 dark:text-gray-300">Technologies Used</Label>
              <div className="flex space-x-2">
                <Input
                  value={newTechnology[project.id] || ""}
                  onChange={(e) =>
                    setNewTechnology({
                      ...newTechnology,
                      [project.id]: e.target.value,
                    })
                  }
                  onKeyPress={(e) => handleTechnologyKeyPress(e, project.id)}
                  placeholder="e.g., React, Node.js, MongoDB"
                  className="flex-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
                <Button
                className={'bg-purple-600 dark:purple-900 hover:bg-purple-500 hover:dark:bg-800 '}
                  type="button"
                  onClick={() => addTechnology(project.id)}
                  disabled={!newTechnology[project.id]?.trim()}
                >
                  <Plus className="h-4 w-4 txet-white dark:txet-black" />
                </Button>
              </div>

              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    >
                      {tech}
                      <button
                        onClick={() => removeTechnology(project.id, techIndex)}
                        className="ml-2 hover:text-red-500"
                        type="button"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length > 0 && (
        <Button onClick={addProject} variant="outline" className="w-full bg-transparent bg-purple-600 hover:bg-purple-500 text-white dark:bg-purple-900 dark:hover:bg-purple-800">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Project
        </Button>
      )}
    </div>
  );
}

