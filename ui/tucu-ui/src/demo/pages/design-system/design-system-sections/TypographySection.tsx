import React from 'react';
import { CardContainer, CardTitle, Typography, Badge } from '../../../../index';

const TypographySection: React.FC = () => {
  const typographyTags = [
    { tag: 'headline', label: 'Headline', category: 'Tucu UI Tokens' },
    { tag: 'body', label: 'Body', category: 'Tucu UI Tokens' },
    { tag: 'label-1', label: 'Label 1', category: 'Tucu UI Tokens' },
    { tag: 'label-2', label: 'Label 2', category: 'Tucu UI Tokens' },
    { tag: 'caption', label: 'Caption', category: 'Tucu UI Tokens' },
    { tag: 'legal', label: 'Legal', category: 'Tucu UI Tokens' },
    { tag: 'h1', label: 'Heading 1 (h1)', category: 'HTML Tags' },
    { tag: 'h2', label: 'Heading 2 (h2)', category: 'HTML Tags' },
    { tag: 'h3', label: 'Heading 3 (h3)', category: 'HTML Tags' },
    { tag: 'h4', label: 'Heading 4 (h4)', category: 'HTML Tags' },
    { tag: 'h5', label: 'Heading 5 (h5)', category: 'HTML Tags' },
    { tag: 'h6', label: 'Heading 6 (h6)', category: 'HTML Tags' },
    { tag: 'p', label: 'Paragraph (p)', category: 'HTML Tags' },
    { tag: 'i', label: 'Italic (i)', category: 'HTML Tags' },
    { tag: 'b', label: 'Bold (b)', category: 'HTML Tags' },
    { tag: 'strong', label: 'Strong', category: 'HTML Tags' },
    { tag: 'em', label: 'Emphasis (em)', category: 'HTML Tags' },
    { tag: 'small', label: 'Small', category: 'HTML Tags' },
    { tag: 'q', label: 'Quote (q)', category: 'HTML Tags' },
    { tag: 'blockquote', label: 'Blockquote', category: 'HTML Tags' },
    { tag: 'code', label: 'Code', category: 'HTML Tags' },
    { tag: 'pre', label: 'Preformatted (pre)', category: 'HTML Tags' },
    { tag: 'kbd', label: 'Keyboard (kbd)', category: 'HTML Tags' },
    { tag: 'mark', label: 'Mark', category: 'HTML Tags' },
    { tag: 'del', label: 'Deleted (del)', category: 'HTML Tags' },
    { tag: 'sub', label: 'Subscript (sub)', category: 'HTML Tags' },
    { tag: 'sup', label: 'Superscript (sup)', category: 'HTML Tags' },
    { tag: 'abbr', label: 'Abbreviation (abbr)', category: 'HTML Tags' },
    { tag: 'span', label: 'Span', category: 'HTML Tags' },
  ];

  const typographyColors = [
    { value: 'default', label: 'Default' },
    { value: 'primary', label: 'Primary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'muted', label: 'Muted' },
    { value: 'success', label: 'Success' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' },
  ] as const;

  const typographyFontFamilies = [
    { value: 'default', label: 'Default (Sans)' },
    { value: 'mono', label: 'Mono' },
  ] as const;

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Typography
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Typography component with all available tags, colors, and font families
        </Typography>
      </div>

      {/* Tucu UI Tokens */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Tucu UI Tokens - Type Scale" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400 mb-6">
              Hierarchical typography tokens designed for consistent text styling across the design system.
            </Typography>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-light-dark">
              <div className="space-y-6">
                {typographyTags
                  .filter((style) => style.category === 'Tucu UI Tokens')
                  .map((style) => (
                    <div
                      key={style.tag}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <Typography
                            tag={
                              style.tag as
                                | 'headline'
                                | 'body'
                                | 'label-1'
                                | 'label-2'
                                | 'caption'
                                | 'legal'
                            }
                          >
                            {style.label}
                          </Typography>
                          <Badge variant="outline" className="text-xs font-mono">
                            {style.tag}
                          </Badge>
                        </div>
                        <Typography tag="caption" className="text-muted">
                          {style.tag === 'headline' && 'Main headlines and hero text'}
                          {style.tag === 'body' && 'Primary body text and paragraphs'}
                          {style.tag === 'label-1' && 'Primary labels and form fields'}
                          {style.tag === 'label-2' && 'Secondary labels and smaller text'}
                          {style.tag === 'caption' && 'Image captions and metadata'}
                          {style.tag === 'legal' && 'Legal text, disclaimers, and fine print'}
                        </Typography>
                      </div>
                      <div className="md:w-1/2">
                        <Typography
                          tag={
                            style.tag as
                              | 'headline'
                              | 'body'
                              | 'label-1'
                              | 'label-2'
                              | 'caption'
                              | 'legal'
                          }
                        >
                          {style.tag === 'headline' && 'The quick brown fox jumps over the lazy dog'}
                          {style.tag === 'body' &&
                            'The quick brown fox jumps over the lazy dog. This is body text used for paragraphs and main content.'}
                          {style.tag === 'label-1' && 'Label Text'}
                          {style.tag === 'label-2' && 'Small Label'}
                          {style.tag === 'caption' && 'Image caption or supporting text'}
                          {style.tag === 'legal' && 'Legal disclaimer text'}
                        </Typography>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* HTML Tags */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="HTML Tags" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400 mb-6">
              Standard HTML semantic tags with Tucu UI styling.
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {typographyTags
                .filter((style) => style.category === 'HTML Tags')
                .map((style) => (
                  <div
                    key={style.tag}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
                  >
                    <div className="space-y-1">
                      <Typography tag="h4">{style.label}</Typography>
                      <Typography tag="h4" className="text-muted break-all text-xs">
                        tag="{style.tag}"
                      </Typography>
                    </div>
                    <div className="min-h-[60px] flex items-start overflow-hidden">
                      <Typography
                        className={
                          style.tag === 'pre' || style.tag === 'code'
                            ? 'overflow-wrap-anywhere whitespace-pre-wrap w-full'
                            : 'overflow-wrap-anywhere'
                        }
                        tag={style.tag as any}
                        {...(style.tag === 'abbr' && { title: 'Abbreviation example' })}
                      >
                        {style.tag === 'pre' || style.tag === 'code'
                          ? 'const example = "The quick brown fox jumps over the lazy dog";'
                          : 'The quick brown fox jumps over the lazy dog'}
                      </Typography>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Typography Colors */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Typography Colors" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400 mb-6">
              Available color props for the Typography component.
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {typographyColors.map((color) => (
                <div
                  key={color.value}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
                >
                  <div className="space-y-1">
                    <Typography tag="h4">{color.label}</Typography>
                    <Typography tag="h4" className="text-muted break-all text-xs">
                      color="{color.value}"
                    </Typography>
                  </div>
                  <div className="min-h-[40px] flex items-center">
                    <Typography tag="p" color={color.value as any}>
                      The quick brown fox jumps over the lazy dog
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Typography Font Families */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Typography Font Families" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400 mb-6">
              Available fontFamily props for the Typography component.
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {typographyFontFamilies.map((font) => (
                <div
                  key={font.value}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
                >
                  <div className="space-y-1">
                    <Typography tag="h4">{font.label}</Typography>
                    <Typography tag="h4" className="text-muted break-all text-xs">
                      fontFamily="{font.value}"
                    </Typography>
                  </div>
                  <div className="min-h-[40px] flex items-center">
                    <Typography tag="p" fontFamily={font.value as any}>
                      The quick brown fox jumps over the lazy dog
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Combined Examples */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Combined Examples" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400 mb-6">
              Examples combining tags, colors, and font families.
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <Typography tag="h4" className="text-xs text-muted">
                  Headline + Primary + Mono
                </Typography>
                <Typography tag="headline" color="primary" fontFamily="mono">
                  The quick brown fox
                </Typography>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <Typography tag="h4" className="text-xs text-muted">
                  Body + Success
                </Typography>
                <Typography tag="body" color="success">
                  The quick brown fox jumps over the lazy dog
                </Typography>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <Typography tag="h4" className="text-xs text-muted">
                  Label 1 + Warning
                </Typography>
                <Typography tag="label-1" color="warning">
                  The quick brown fox
                </Typography>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <Typography tag="h4" className="text-xs text-muted">
                  Code + Error + Mono
                </Typography>
                <Typography tag="code" color="error" fontFamily="mono">
                  const example = "Hello World";
                </Typography>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <Typography tag="h4" className="text-xs text-muted">
                  Caption + Muted
                </Typography>
                <Typography tag="caption" color="muted">
                  The quick brown fox jumps over the lazy dog
                </Typography>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <Typography tag="h4" className="text-xs text-muted">
                  H2 + Secondary
                </Typography>
                <Typography tag="h2" color="secondary">
                  The quick brown fox
                </Typography>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TypographySection;

