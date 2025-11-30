# New Features Guidelines

## Overview
When creating new pages, features, or significant code components, organize all related files in dedicated folders for better maintainability and clarity.

## Organization Requirements

### Folder Structure
- Create a dedicated folder for each new feature/page
- Use descriptive, lowercase folder names (e.g., `userProfile`, `paymentSystem`, `dataExport`)
- Place all related files within their respective feature folder

### File Naming Convention
- Use camelCase for all file names
- Include file extensions that reflect the file type
- Examples:
  - `userProfile.html` (HTML files)
  - `userProfileController.js` (JavaScript files)
  - `userProfile.module.css` (CSS modules)
  - `userProfile.config.json` (Configuration files)

## What to Include in Feature Folders

### Core Files
- HTML templates
- JavaScript modules and controllers
- CSS stylesheets and modules
- Configuration files
- Data files (JSON, CSV, etc.)

### Supporting Files
- Test files
- Documentation
- Asset files (images, icons, fonts)
- API endpoints or server files

## Examples

### Feature: Loan Calculator
```
loanCalculator/
├── loanCalculator.html          # Main page template
├── loanCalculator.js           # Core functionality
├── loanCalculator.module.css   # Scoped styles
├── loanCalculator.config.json  # Configuration settings
└── loanCalculator.utils.js     # Helper functions
```

### Feature: User Inventory
```
userInventory/
├── userInventory.html          # Main inventory page
├── userInventory.js           # Inventory logic
├── userInventory.api.js       # API interactions
├── userInventory.module.css   # Inventory styles
└── README.md                  # Feature documentation
```

## Benefits
- **Maintainability**: Related code stays together
- **Scalability**: Easy to add new features without clutter
- **Navigation**: Quicker file discovery and editing
- **Team Collaboration**: Clear structure for multiple developers

## Important Notes
- Always use camelCase, never kebab-case or snake_case for file names
- Keep feature folders focused on a single responsibility
- Update documentation within the feature folder when adding new files