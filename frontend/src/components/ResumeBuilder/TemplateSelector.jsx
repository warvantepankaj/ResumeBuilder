// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Check } from "lucide-react"

// export function TemplateSelector({ selectedTemplate = "", onSelect = () => {}, resumeData = {} }) {
//   const TEMPLATES = [
//     {
//       id: "modern",
//       name: "Modern Professional",
//       description: "Clean, contemporary design with subtle colors",
//       preview: "A sleek design with emerald accents and modern typography",
//     },
//     {
//       id: "classic",
//       name: "Classic Traditional",
//       description: "Traditional format preferred by conservative industries",
//       preview: "Timeless black and white design with clear sections",
//     },
//     {
//       id: "creative",
//       name: "Creative Designer",
//       description: "Bold design for creative professionals",
//       preview: "Eye-catching layout with creative elements and colors",
//     },
//     {
//       id: "minimal",
//       name: "Minimal Clean",
//       description: "Ultra-clean design focusing on content",
//       preview: "Simple, distraction-free layout with plenty of whitespace",
//     },
//   ]

//   return (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h3 className="text-lg font-semibold mb-2">Choose Your Resume Template</h3>
//         <p className="text-muted-foreground">Select a design that matches your industry and personal style</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {TEMPLATES.map((template) => (
//           <Card
//             key={template.id}
//             className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
//               selectedTemplate === template.id
//                 ? "ring-2 ring-primary border-primary bg-primary/5"
//                 : "hover:border-primary/50"
//             }`}
//             onClick={() => onSelect(template.id)}
//           >
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <CardTitle className="text-base">{template.name}</CardTitle>
//                   <CardDescription>{template.description}</CardDescription>
//                 </div>
//                 {selectedTemplate === template.id && (
//                   <div className="p-1 bg-primary rounded-full">
//                     <Check className="h-4 w-4 text-primary-foreground" />
//                   </div>
//                 )}
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="bg-muted/30 rounded-lg p-4 min-h-[120px] flex items-center justify-center">
//                 <div className="text-center space-y-2">
//                   <div className="w-16 h-20 bg-gradient-to-b from-primary/20 to-primary/10 rounded mx-auto"></div>
//                   <p className="text-xs text-muted-foreground">{template.preview}</p>
//                 </div>
//               </div>
//               {selectedTemplate === template.id && (
//                 <Badge className="mt-3" variant="default">
//                   Selected
//                 </Badge>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }




"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Check } from "lucide-react"

export function TemplateSelector({ selectedTemplate = "", onSelect = () => {}, resumeData = {} }) {
  const TEMPLATES = [
    {
      id: "modern",
      name: "Modern Professional",
      image:"Images/Purple.png",
      description: "Clean, contemporary design with subtle colors",
      preview: "A sleek design with emerald accents and modern typography",
    },
    {
      id: "classic",
      name: "Classic Traditional",
      image:"",
      description: "Traditional format preferred by conservative industries",
      preview: "Timeless black and white design with clear sections",
    },
    {
      id: "creative",
      name: "Creative Designer",
      image:"",
      description: "Bold design for creative professionals",
      preview: "Eye-catching layout with creative elements and colors",
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      image:"",
      description: "Ultra-clean design focusing on content",
      preview: "Simple, distraction-free layout with plenty of whitespace",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Choose Your Resume Template</h3>
        <p className="text-muted-foreground">Select a design that matches your industry and personal style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEMPLATES.map((template) => {
          const isSelected = selectedTemplate === template.id
          return (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-200 
                ${isSelected 
                  ? "ring-2 ring-purple-800 border-purple-300 bg-purple-700/5 hover:bg-purple-400/10 dark:bg-purple-700/5" 
                  : "hover:border-purple-900  dark:hover:border-purple-900 "}
              `}
              onClick={() => onSelect(template.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                  {isSelected && (
                    <div className="p-1 bg-primary rounded-full bg-purple-500">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent >
                <div className="bg-muted/30 dark:bg-muted/50 rounded-lg p-4 min-h-[120px] flex items-center justify-center">
                  <div className="text-center space-y-2">
                     <div className="w-16 h-20 bg-gradient-to-b from-primary/20 to-primary/10 rounded mx-auto"></div>
                    <p className="text-xs text-muted-foreground dark:text-muted-foreground">{template.preview}</p>
                  </div>
                </div>
                {isSelected && (
                  <Badge className="mt-3 text-white bg-purple-600 dark:bg-purple-800" variant="default">
                    Selected
                  </Badge>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

