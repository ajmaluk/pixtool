/**
 * Codebase Validation & Quality Checks
 * Run this to identify common issues and code smells
 */

export const VALIDATION_RULES = {
  // Check for unused imports
  hasUnusedImports: (fileContent) => {
    const importMatch = fileContent.match(/import\s+{?\s*(\w+)/g) || []
    // This is simplified; a real check would parse AST
    return importMatch.length > 0
  },

  // Check for missing error handling
  hasMissingErrorHandling: (fileContent) => {
    const asyncMatches = (fileContent.match(/await\s+\w+\(/g) || []).length
    const tryCatchMatches = (fileContent.match(/try\s*{/g) || []).length
    return asyncMatches > tryCatchMatches
  },

  // Check for null/undefined checks
  hasNullChecks: (fileContent) => {
    const nullChecks = (fileContent.match(/(\?\.|\?\?|if\s*\(\s*\w+\s*\))/g) || []).length
    const dangerousAccess = (fileContent.match(/\.\w+\(/g) || []).length
    // This is a rough heuristic
    return nullChecks > dangerousAccess * 0.1
  },

  // Check for hardcoded values
  hasHardcodedUrls: (fileContent) => {
    return /['"]https?:\/\/[^'"]+['"]/.test(fileContent)
  },

  // Check for console statements
  hasConsoleLogs: (fileContent) => {
    return /console\.(log|warn|error|debug)/.test(fileContent)
  },

  // Check for proper prop validation
  hasPropTypes: (fileContent) => {
    return /PropTypes\.|TypeScript|@ts-|interface\s+\w+Props/.test(fileContent)
  },

  // Check for memoization
  hasMemoization: (fileContent) => {
    return /useMemo|useCallback|React\.memo|memo/.test(fileContent)
  },

  // Check for accessibility
  hasAccessibility: (fileContent) => {
    return /aria-|role=|alt=/i.test(fileContent)
  },
}

export const validateFile = (fileName, fileContent) => {
  const issues = []

  // Error handling check
  if (VALIDATION_RULES.hasMissingErrorHandling(fileContent)) {
    issues.push({
      severity: 'HIGH',
      message: 'Missing error handling for async operations',
      file: fileName,
    })
  }

  // Hardcoded URLs
  if (VALIDATION_RULES.hasHardcodedUrls(fileContent) && !fileName.includes('.json')) {
    issues.push({
      severity: 'MEDIUM',
      message: 'Hardcoded URLs detected - should use config',
      file: fileName,
    })
  }

  // Console logs
  if (VALIDATION_RULES.hasConsoleLogs(fileContent)) {
    issues.push({
      severity: 'LOW',
      message: 'Console statements detected - remove before production',
      file: fileName,
    })
  }

  // No prop validation
  if (!VALIDATION_RULES.hasPropTypes(fileContent) && fileName.includes('components/')) {
    issues.push({
      severity: 'MEDIUM',
      message: 'Missing prop validation (PropTypes or TypeScript)',
      file: fileName,
    })
  }

  return issues
}

export const generateReport = (allIssues) => {
  const bySeverity = {
    CRITICAL: allIssues.filter(i => i.severity === 'CRITICAL'),
    HIGH: allIssues.filter(i => i.severity === 'HIGH'),
    MEDIUM: allIssues.filter(i => i.severity === 'MEDIUM'),
    LOW: allIssues.filter(i => i.severity === 'LOW'),
  }

  return {
    total: allIssues.length,
    bySeverity,
    summary: `Found ${allIssues.length} issues: ${bySeverity.CRITICAL.length} critical, ${bySeverity.HIGH.length} high, ${bySeverity.MEDIUM.length} medium, ${bySeverity.LOW.length} low`,
  }
}

export default {
  VALIDATION_RULES,
  validateFile,
  generateReport,
}
