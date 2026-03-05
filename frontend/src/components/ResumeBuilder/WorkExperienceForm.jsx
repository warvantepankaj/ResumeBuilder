// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Plus, Trash2, GripVertical } from "lucide-react"


// export function WorkExperienceForm({ data = [], onUpdate = () => {} }) {
//   const addExperience = () => {
//     const newExperience = {
//       id: Date.now().toString(),
//       company: "",
//       position: "",
//       startDate: "",
//       endDate: "",
//       current: false,
//       description: "",
//       achievements: [""],
//     }
//     onUpdate([...data, newExperience])
//   }

//   const removeExperience = (id) => {
//     onUpdate(data.filter((exp) => exp.id !== id))
//   }

//   const updateExperience = (id, field, value) => {
//     onUpdate(
//       data.map((exp) =>
//         exp.id === id
//           ? {
//               ...exp,
//               [field]: value,
//             }
//           : exp
//       )
//     )
//   }

//   const addAchievement = (id) => {
//     const experience = data.find((exp) => exp.id === id)
//     if (experience) {
//       updateExperience(id, "achievements", [...experience.achievements, ""])
//     }
//   }

//   const removeAchievement = (id, index) => {
//     const experience = data.find((exp) => exp.id === id)
//     if (experience) {
//       const newAchievements = experience.achievements.filter((_, i) => i !== index)
//       updateExperience(id, "achievements", newAchievements)
//     }
//   }

//   const updateAchievement = (id, index, value) => {
//     const experience = data.find((exp) => exp.id === id)
//     if (experience) {
//       const newAchievements = [...experience.achievements]
//       newAchievements[index] = value
//       updateExperience(id, "achievements", newAchievements)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {data.length === 0 && (
//         <Card className="bg-muted/30">
//           <CardContent className="pt-6 text-center">
//             <p className="text-muted-foreground mb-4">No work experience added yet</p>
//             <Button onClick={addExperience}>
//               <Plus className="h-4 w-4 mr-2" />
//               Add Your First Job
//             </Button>
//           </CardContent>
//         </Card>
//       )}

//       {data.map((experience, index) => (
//         <Card key={experience.id}>
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <GripVertical className="h-4 w-4 text-muted-foreground" />
//                 <CardTitle className="text-base">Experience #{index + 1}</CardTitle>
//               </div>
//               <Button variant="ghost" size="sm" onClick={() => removeExperience(experience.id)}>
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Company Name *</Label>
//                 <Input
//                   value={experience.company || ""}
//                   onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
//                   placeholder="Google"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Job Title *</Label>
//                 <Input
//                   value={experience.position || ""}
//                   onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
//                   placeholder="Software Engineer"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Start Date *</Label>
//                 <Input
//                   type="month"
//                   value={experience.startDate || ""}
//                   onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>End Date</Label>
//                 <Input
//                   type="month"
//                   value={experience.endDate || ""}
//                   onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
//                   disabled={experience.current}
//                 />
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id={`current-${experience.id}`}
//                     checked={experience.current || false}
//                     onCheckedChange={(checked) => updateExperience(experience.id, "current", checked)}
//                   />
//                   <Label htmlFor={`current-${experience.id}`} className="text-sm">
//                     I currently work here
//                   </Label>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Job Description</Label>
//               <Textarea
//                 value={experience.description || ""}
//                 onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
//                 placeholder="Brief description of your role and responsibilities..."
//                 className="min-h-[80px]"
//               />
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <Label>Key Achievements</Label>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   onClick={() => addAchievement(experience.id)}
//                   className="bg-transparent"
//                 >
//                   <Plus className="h-4 w-4 mr-2" />
//                   Add Achievement
//                 </Button>
//               </div>
//               {(experience.achievements || []).map((achievement, achievementIndex) => (
//                 <div key={achievementIndex} className="flex items-center space-x-2">
//                   <Input
//                     value={achievement || ""}
//                     onChange={(e) => updateAchievement(experience.id, achievementIndex, e.target.value)}
//                     placeholder="Increased team productivity by 30% through process optimization"
//                     className="flex-1"
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => removeAchievement(experience.id, achievementIndex)}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       ))}

//       {data.length > 0 && (
//         <Button onClick={addExperience} variant="outline" className="w-full bg-transparent">
//           <Plus className="h-4 w-4 mr-2" />
//           Add Another Experience
//         </Button>
//       )}
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/Checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Plus, Trash2, GripVertical } from "lucide-react"

export function WorkExperienceForm({ data = [], onUpdate = () => {} }) {
  const addExperience = () => {
    onUpdate([
      ...data,
      {
        id: Date.now().toString(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        location:"",
        description: "",
        achievements: [""],
      },
    ])
  }

  const removeExperience = (id) => onUpdate(data.filter((exp) => exp.id !== id))

  const updateExperience = (id, field, value) => {
    onUpdate(
      data.map((exp) =>
        exp.id === id
          ? { ...exp, [field]: value }
          : exp
      )
    )
  }

  const addAchievement = (id) => {
    const experience = data.find((exp) => exp.id === id)
    if (experience) updateExperience(id, "achievements", [...experience.achievements, ""])
  }

  const removeAchievement = (id, index) => {
    const experience = data.find((exp) => exp.id === id)
    if (experience) updateExperience(
      id,
      "achievements",
      experience.achievements.filter((_, i) => i !== index)
    )
  }

  const updateAchievement = (id, index, value) => {
    const experience = data.find((exp) => exp.id === id)
    if (experience) {
      const newAchievements = [...experience.achievements]
      newAchievements[index] = value
      updateExperience(id, "achievements", newAchievements)
    }
  }

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <Card className="bg-muted/30 bg-gray-100 shadow-md dark:bg-gray-800">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">No work experience added yet</p>
            <Button onClick={addExperience} className={'bg-purple-600 hover:bg-purple-500 text-white dark:bg-purple-800 dark:hover:bg-purple-700'}>
              <Plus className="h-4 w-4 mr-2" /> Add Your First Job
            </Button>
          </CardContent>
        </Card>
      )}

      {data.map((experience, index) => (
        <Card key={experience.id} className={'bg-gray-100 shadow-md dark:bg-gray-900'}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                <CardTitle className="text-base  dark:text-gray-100 ">Experience #{index + 1}</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeExperience(experience.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Company & Position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name *</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                  placeholder="Google"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Job Title *</Label>
                <Input
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                  placeholder="Software Engineer"
                  required
                />
              </div>
            </div>


            {/* Dates & Current Job */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                  disabled={experience.current}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${experience.id}`}
                    checked={experience.current}
                    onCheckedChange={(checked) => updateExperience(experience.id, "current", checked)}
                  />
                  <Label htmlFor={`current-${experience.id}`} className="text-sm">
                    I currently work here
                  </Label>
                </div>
              </div>
            </div>


              {/* Location */}
            <div className="space-y-2">
              <Label className="text-black dark:text-gwhite">Location *</Label>
              <Input
                value={experience.location}
                onChange={(e) =>
                updateExperience(experience.id, "location", e.target.value)
              }
              placeholder="Pune, Hinjewadi"
              required
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                placeholder="Brief description of your role and responsibilities..."
                className="min-h-[80px]"
              />
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Key Achievements</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addAchievement(experience.id)} className="bg-transparent bg-purple-600 text-white dark:bg-purple-800 dark:hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2 " /> Add Achievement
                </Button>
              </div>
              {experience.achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Input
                    value={achievement}
                    onChange={(e) => updateAchievement(experience.id, idx, e.target.value)}
                    placeholder="Increased team productivity by 30% through process optimization"
                    className="flex-1"
                  />
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeAchievement(experience.id, idx)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length > 0 && (
        <Button onClick={addExperience} variant="outline" className="w-full bg-transparent bg-purple-600 text-white dark:bg-purple-900 dark:hover:bg-purple-800">
          <Plus className="h-4 w-4 mr-2 " /> Add Another Experience
        </Button>
      )}
    </div>
  )
}
