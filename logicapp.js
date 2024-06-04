{
  "definition": {
    "$schema": "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
    "actions": {
      "Parse_JSON": {
        "type": "ParseJson",
        "inputs": {
          "content": "@triggerBody()",
          "schema": {
            "type": "object",
            "properties": {
              "brideName": { "type": "string" },
              "brideEmail": { "type": "string", "format": "email" },
              "brideDob": { "type": "string", "format": "date" },
              "brideMaritalStatus": { "type": "string", "enum": ["Bachelorette", "Divorcee", "Widowed"] },
              "brideConsent": { "type": "string", "enum": ["Yes", "No"] },
              "groomName": { "type": "string" },
              "groomEmail": { "type": "string", "format": "email" },
              "groomDob": { "type": "string", "format": "date" },
              "groomMaritalStatus": { "type": "string", "enum": ["Bachelor", "Divorcee", "Widowed"] },
              "groomConsent": { "type": "string", "enum": ["Yes", "No"] },
              "brideBloodGroup": { "type": "string", "enum": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
              "groomBloodGroup": { "type": "string", "enum": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
              "brideGenotype": { "type": "string", "enum": ["AA", "AC", "AS", "SS", "SC", "CC"] },
              "groomGenotype": { "type": "string", "enum": ["AA", "AC", "AS", "SS", "SC", "CC"] },
              "marriageDate": { "type": "string", "format": "date" }
            },
            "required": [
              "brideName",
              "brideEmail",
              "brideDob",
              "brideMaritalStatus",
              "brideConsent",
              "groomName",
              "groomEmail",
              "groomDob",
              "groomMaritalStatus",
              "groomConsent",
              "brideBloodGroup",
              "groomBloodGroup",
              "brideGenotype",
              "groomGenotype",
              "marriageDate"
            ]
          }
        }
      },
      "Create_blob": {
        "type": "ApiConnection",
        "inputs": {
          "method": "post",
          "host": {
            "connection": {
              "name": "/subscriptions/{subscription-id}/providers/Microsoft.Web/connections/azureblob"
            }
          },
          "path": "/v2/datasets/default/containers/{container-name}/blobs",
          "headers": {
            "x-ms-blob-type": "BlockBlob",
            "x-ms-content-type": "application/json"
          },
          "body": {
            "name": "marriage-details-@{formatDateTime(utcNow(), 'yyyy-MM-ddTHH-mm-ss')}.json",
            "content": {
              "brideName": "@{body('Parse_JSON')?['brideName']}",
              "brideEmail": "@{body('Parse_JSON')?['brideEmail']}",
              "brideDob": "@{body('Parse_JSON')?['brideDob']}",
              "brideMaritalStatus": "@{body('Parse_JSON')?['brideMaritalStatus']}",
              "brideConsent": "@{body('Parse_JSON')?['brideConsent']}",
              "groomName": "@{body('Parse_JSON')?['groomName']}",
              "groomEmail": "@{body('Parse_JSON')?['groomEmail']}",
              "groomDob": "@{body('Parse_JSON')?['groomDob']}",
              "groomMaritalStatus": "@{body('Parse_JSON')?['groomMaritalStatus']}",
              "groomConsent": "@{body('Parse_JSON')?['groomConsent']}",
              "brideBloodGroup": "@{body('Parse_JSON')?['brideBloodGroup']}",
              "groomBloodGroup": "@{body('Parse_JSON')?['groomBloodGroup']}",
              "brideGenotype": "@{body('Parse_JSON')?['brideGenotype']}",
              "groomGenotype": "@{body('Parse_JSON')?['groomGenotype']}",
              "marriageDate": "@{body('Parse_JSON')?['marriageDate']}"
            }
          }
        }
      }
    },
    "triggers": {
      "When_a_HTTP_request_is_received": {
        "type": "Request",
        "inputs": {
          "schema": {
            "type": "object",
            "properties": {
              "brideName": { "type": "string" },
              "brideEmail": { "type": "string", "format": "email" },
              "brideDob": { "type": "string", "format": "date" },
              "brideMaritalStatus": { "type": "string", "enum": ["Bachelorette", "Divorcee", "Widowed"] },
              "brideConsent": { "type": "string", "enum": ["Yes", "No"] },
              "groomName": { "type": "string" },
              "groomEmail": { "type": "string", "format": "email" },
              "groomDob": { "type": "string", "format": "date" },
              "groomMaritalStatus": { "type": "string", "enum": ["Bachelor", "Divorcee", "Widowed"] },
              "groomConsent": { "type": "string", "enum": ["Yes", "No"] },
              "brideBloodGroup": { "type": "string", "enum": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
              "groomBloodGroup": { "type": "string", "enum": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
              "brideGenotype": { "type": "string", "enum": ["AA", "AC", "AS", "SS", "SC", "CC"] },
              "groomGenotype": { "type": "string", "enum": ["AA", "AC", "AS", "SS", "SC", "CC"] },
              "marriageDate": { "type": "string", "format": "date" }
            },
            "required": [
              "brideName",
              "brideEmail",
              "brideDob",
              "brideMaritalStatus",
              "brideConsent",
              "groomName",
              "groomEmail",
              "groomDob",
              "groomMaritalStatus",
              "groomConsent",
              "brideBloodGroup",
              "groomBloodGroup",
              "brideGenotype",
              "groomGenotype",
              "marriageDate"
            ]
          }
        }
      }
    }
  }
}
