"use client"

import PropTypes from "prop-types";
import { Input } from "../ui/Input.jsx";
import { Label } from "../ui/Label.jsx";

export function PersonalInfoForm({ data = {}, onUpdate = () => {} }) {
  const handleChange = (field, value) => {
    onUpdate({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6 ">
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">
              First Name *
            </Label>
            <Input
              id="firstName"
              value={data.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="John"
              required
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">
              Last Name *
            </Label>
            <Input
              id="lastName"
              value={data.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Doe"
              required
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john.doe@email.com"
              required
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
              required
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Address
        </h3>
        <div className="space-y-4">
          {/* <div className="space-y-2">
            <Label htmlFor="address" className="text-gray-700 dark:text-gray-300">
              Street Address
            </Label>
            <Input
              id="address"
              value={data.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="123 Main Street"
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            />
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-gray-700 dark:text-gray-300">
                City
              </Label>
              <Input
                id="city"
                value={data.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="New York"
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="text-gray-700 dark:text-gray-300">
                State
              </Label>
              <Input
                id="state"
                value={data.state || ""}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="NY"
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode" className="text-gray-700 dark:text-gray-300">
                ZIP Code
              </Label>
              <Input
                id="zipCode"
                value={data.zipCode || ""}
                onChange={(e) => handleChange("zipCode", e.target.value)}
                placeholder="10001"
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Online Presence */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Online Presence (Optional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="text-gray-700 dark:text-gray-300">
              LinkedIn Profile
            </Label>
            <Input
              id="linkedin"
              value={data.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="linkedin.com/in/johndoe"
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website" className="text-gray-700 dark:text-gray-300">
              Personal Website
            </Label>
            <Input
              id="website"
              value={data.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="johndoe.com"
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

PersonalInfoForm.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    linkedin: PropTypes.string,
    website: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};
