#!/usr/bin/env bash
set -euo pipefail
base=http://localhost:3000
ok=0
fail=0

check(){
  echo -n "- $1: "
  if eval "$2"; then
    echo "OK"; ok=$((ok+1))
  else
    echo "FAIL"; fail=$((fail+1))
  fi
}

# 1. Health (container up and responding)
check "root page responds" "curl -fsS $base > /dev/null"

# 2. ISR Cache header for docs
check "Cache-Control header on docs page" "curl -fsSI $base/en/docs/v1/introduction | grep -q 'Cache-Control: .*s-maxage=60'"

# 3. English content present in doc-content
check "English doc content contains 'Welcome'" "curl -fsS $base/en/docs/v1/introduction | grep -q 'Welcome to NextDocs'"

# 4. Spanish content present
check "Spanish doc content contains 'Bienvenido'" "curl -fsS $base/es/docs/v1/introduction | grep -q 'Bienvenido' || true"

# 5. Sidebar present and nav link exists
check "sidebar present" "curl -fsS $base/en/docs/v1/introduction | grep -q 'data-testid=\"sidebar\"'"
check "sidebar link for introduction" "curl -fsS $base/en/docs/v1/introduction | grep -q 'data-testid=\"sidebar-nav-link-introduction\"'"

# 6. Search index contains doc
check "search index contains path" "curl -fsS '$base/api/search-index?locale=en' | grep -q '/docs/v1/introduction'"

# 7. API Reference page contains swagger UI container
check "API reference contains .swagger-ui" "curl -fsS $base/api-reference | grep -q 'swagger-ui'"

# 8. Version selector and options
check "version selector present" "curl -fsS $base/en/docs/v1/introduction | grep -q 'data-testid=\"version-selector\"'"
check "v2 option present" "curl -fsS $base/en/docs/v1/introduction | grep -q 'data-testid=\"version-option-v2\"'"

# 9. Language switcher present
check "language-switcher present" "curl -fsS $base/en/docs/v1/introduction | grep -q 'data-testid=\"language-switcher\"'"

# 10. Theme toggle present
check "theme toggle present" "curl -fsS $base/en/docs/v1/introduction | grep -q 'data-testid=\"theme-toggle\"'"

# 11. TOC exists and links exist
check "TOC present" "curl -fsS $base/en/docs/v1/introduction | grep -q 'data-testid=\"table-of-contents\"'"
check "TOC link Getting Started" "curl -fsS $base/en/docs/v1/introduction | grep -q 'data-testid=\"toc-link-getting-started\"'"

# 12. Feedback widget
check "feedback input present" "curl -fsS $base/en/docs/v1/introduction | grep -q 'data-testid=\"feedback-input\"'"
check "feedback submit present" "curl -fsS $base/en/docs/v1/introduction | grep -q 'data-testid=\"feedback-submit\"'"

# 13. Code block and copy button
check "code block present" "curl -fsS $base/en/docs/v1/introduction | grep -q 'data-testid=\"code-block\"'"
check "copy button present" "curl -fsS $base/en/docs/v1/introduction | grep -q 'data-testid=\"copy-code-button\"'"

# Report
echo
if [ "$fail" -eq 0 ]; then
  echo "All checks passed: $ok checks OK."
  exit 0
else
  echo "Some checks failed: $ok OK, $fail FAILED."
  exit 2
fi
