import React from 'react';
import {
  CardContainer,
  Typography,
  LucideIcons,
  Badge,
} from '../../../../index';

const FormComponentsSection: React.FC = () => {
  return (
    <>
      <div className="text-center">
        <Typography
          tag="h2"
          className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          Form Components
        </Typography>
        <Typography
          tag="p"
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Complete collection of form inputs and controls
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: (
              <LucideIcons.Type className="w-6 h-6 text-white filter drop-shadow-sm" />
            ),
            title: 'Text Inputs',
            description: 'Input, Textarea with validation support',
            color: 'from-blue-500 to-cyan-500',
            types: ['Input', 'Textarea', 'Password'],
          },
          {
            icon: (
              <LucideIcons.List className="w-6 h-6 text-white filter drop-shadow-sm" />
            ),
            title: 'Selection',
            description: 'Dropdowns and selection components',
            color: 'from-green-500 to-emerald-500',
            types: ['Select', 'Combobox', 'Autocomplete'],
          },
          {
            icon: (
              <LucideIcons.CheckSquare className="w-6 h-6 text-white filter drop-shadow-sm" />
            ),
            title: 'Choice Controls',
            description: 'Checkbox and radio button groups',
            color: 'from-purple-500 to-violet-500',
            types: ['Checkbox', 'Radio', 'RadioGroup'],
          },
          {
            icon: (
              <LucideIcons.Calendar className="w-6 h-6 text-white filter drop-shadow-sm" />
            ),
            title: 'Date & Time',
            description: 'Date and time picker components',
            color: 'from-orange-500 to-red-500',
            types: ['DatePicker', 'TimePicker', 'DateRange'],
          },
          {
            icon: (
              <LucideIcons.Upload className="w-6 h-6 text-white filter drop-shadow-sm" />
            ),
            title: 'File Upload',
            description: 'File input with drag & drop support',
            color: 'from-pink-500 to-rose-500',
            types: ['FileInput', 'ImageUpload', 'MultiFile'],
          },
          {
            icon: (
              <LucideIcons.Hash className="w-6 h-6 text-white filter drop-shadow-sm" />
            ),
            title: 'Specialized',
            description: 'PIN codes, sliders, and custom inputs',
            color: 'from-indigo-500 to-purple-500',
            types: ['PinCode', 'RangeSlider', 'ColorPicker'],
          },
        ].map((category, index) => (
          <CardContainer
            key={index}
            className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl bg-linear-to-br ${category.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                >
                  {category.icon}
                </div>
                <Typography
                  tag="h3"
                  className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                >
                  {category.title}
                </Typography>
              </div>
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                {category.description}
              </Typography>
              <div className="flex flex-wrap gap-1">
                {category.types.map((type, idx) => (
                  <Badge
                    key={idx}
                    color="success"
                    variant="outline"
                    className="text-xs"
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContainer>
        ))}
      </div>
    </>
  );
};

export default FormComponentsSection;
