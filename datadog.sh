#!/bin/sh
# Make sure you replace the API and/or APP key below
# with the ones for your account
curl  -X POST -H "Content-type: application/json" \
-d '{
      "title": "Error",
      "text": "An error occurred",
      "priority": "normal",
      "tags": ["error:'$1'"],
      "alert_type": "error"
  }' \
'https://app.datadoghq.com/api/v1/events?api_key='$DATADOG_API_KEY