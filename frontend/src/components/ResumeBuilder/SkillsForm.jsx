"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Plus, X } from "lucide-react"

export function SkillsForm({ data = {}, onUpdate }) {
  // Ensure technical and soft are always arrays
  const skillsData = {
    technical: data.technical || [],
    soft: data.soft || [],
  }

  const [newTechnicalSkill, setNewTechnicalSkill] = useState("")
  const [newSoftSkill, setNewSoftSkill] = useState("")

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      onUpdate({
        ...data,
        technical: [...skillsData.technical, newTechnicalSkill.trim()],
      })
      setNewTechnicalSkill("")
    }
  }

  const removeTechnicalSkill = (index) => {
    onUpdate({
      ...data,
      technical: skillsData.technical.filter((_, i) => i !== index),
    })
  }

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      onUpdate({
        ...data,
        soft: [...skillsData.soft, newSoftSkill.trim()],
      })
      setNewSoftSkill("")
    }
  }

  const removeSoftSkill = (index) => {
    onUpdate({
      ...data,
      soft: skillsData.soft.filter((_, i) => i !== index),
    })
  }

  const handleKeyPress = (e, type) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (type === "technical") addTechnicalSkill()
      else addSoftSkill()
    }
  }

  return (
    <div className="space-y-6 text-p ">
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base">Skills Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• Include both technical and soft skills relevant to your target role</p>
          <p>• Use specific technologies, tools, and programming languages</p>
          <p>• Add skills that match job descriptions you're applying for</p>
          <p>• Press Enter to add each skill quickly</p>
        </CardContent>
      </Card>

      {/* Technical Skills */}
      <div className="space-y-4">
        <div>
          <Label className="text-lg font-semibold">Technical Skills</Label>
          <p className="text-sm text-muted-foreground">Programming languages, frameworks, tools, etc.</p>
        </div>

        <div className="flex space-x-2">
          <Input
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, "technical")}
            placeholder="e.g., React, Python, AWS"
            className="flex-1"
          />
          <Button onClick={addTechnicalSkill} className={'bg-purple-600 hover:bg-purple-500 cursor-pointer'} disabled={!newTechnicalSkill.trim()}>
            <Plus className="h-4 w-4 text-white" />
          </Button>
        </div>

        {skillsData.technical.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skillsData.technical.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {skill}
                <button
                  onClick={() => removeTechnicalSkill(index)}
                  className="ml-2 hover:text-destructive"
                  type="button"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Soft Skills */}
      <div className="space-y-4">
        <div>
          <Label className="text-lg font-semibold">Soft Skills</Label>
          <p className="text-sm text-muted-foreground">Communication, leadership, problem-solving, etc.</p>
        </div>

        <div className="flex space-x-2">
          <Input
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, "soft")}
            placeholder="e.g., Leadership, Communication"
            className="flex-1"
          />
          <Button onClick={addSoftSkill} className={'bg-purple-600  hover:bg-purple-500 cursor-pointer dark:bg-purple-900'} disabled={!newSoftSkill.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {skillsData.soft.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skillsData.soft.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {skill}
                <button
                  onClick={() => removeSoftSkill(index)}
                  className="ml-2 hover:text-destructive"
                  type="button"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}




