"use client"

import React from "react";
import PropTypes from "prop-types";
import { Textarea } from "../ui/textarea.jsx";
import { Label } from "../ui/Label.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx";

export function ProfessionalSummaryForm({ data = "", onUpdate = () => {} }) {
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-base text-gray-800 dark:text-gray-100">Writing Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <p>• Keep it concise (2-4 sentences)</p>
          <p>• Highlight your key strengths and achievements</p>
          <p>• Mention years of experience and industry</p>
          <p>• Include relevant keywords for your target role</p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label htmlFor="summary" className="text-gray-700 dark:text-gray-300">
          Professional Summary *
        </Label>
        <Textarea
          id="summary"
          value={data}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder="Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading cross-functional teams to achieve project goals."
          className="min-h-[120px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          required
        />
        <p className="text-sm text-gray-600 dark:text-gray-300">{data.length}/500 characters</p>
      </div>
    </div>
  );
}

ProfessionalSummaryForm.propTypes = {
  data: PropTypes.string,
  onUpdate: PropTypes.func,
};
