{
    "definition": {
        "$schema": "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
        "actions": {
            "Compose": {
                "inputs": "@body('Parse_JSON')",
                "runAfter": {
                    "Parse_JSON": [
                        "Succeeded"
                    ]
                },
                "type": "Compose"
            },
            "Create_blob_(V2)": {
                "inputs": {
                    "body": "@outputs('Compose')",
                    "headers": {
                        "ReadFileMetadataFromServer": true
                    },
                    "host": {
                        "connection": {
                            "name": "@parameters('$connections')['azureblob']['connectionId']"
                        }
                    },
                    "method": "post",
                    "path": "/v2/datasets/@{encodeURIComponent(encodeURIComponent('AccountNameFromSettings'))}/files",
                    "queries": {
                        "folderPath": "/marrigeregformsjson",
                        "name": "form-submissions-@{utcNow('yyyy-MM-ddTHH-mm-ss')}.json",
                        "queryParametersSingleEncoded": true
                    }
                },
                "runAfter": {
                    "Compose": [
                        "Succeeded"
                    ]
                },
                "runtimeConfiguration": {
                    "contentTransfer": {
                        "transferMode": "Chunked"
                    }
                },
                "type": "ApiConnection"
            },
            "Parse_JSON": {
                "inputs": {
                    "content": "@triggerBody()",
                    "schema": {
                        "properties": {
                            "properties": {
                                "properties": {
                                    "brideBloodGroup": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "brideConsent": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "brideDob": {
                                        "properties": {
                                            "format": {
                                                "type": "string"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "brideEmail": {
                                        "properties": {
                                            "format": {
                                                "type": "string"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "brideGenotype": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "brideMaritalStatus": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "brideName": {
                                        "properties": {
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomBloodGroup": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomConsent": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomDob": {
                                        "properties": {
                                            "format": {
                                                "type": "string"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomEmail": {
                                        "properties": {
                                            "format": {
                                                "type": "string"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomGenotype": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomMaritalStatus": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomName": {
                                        "properties": {
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "marriageDate": {
                                        "properties": {
                                            "format": {
                                                "type": "string"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    }
                                },
                                "type": "object"
                            },
                            "required": {
                                "items": {
                                    "type": "string"
                                },
                                "type": "array"
                            },
                            "type": {
                                "type": "string"
                            }
                        },
                        "type": "object"
                    }
                },
                "runAfter": {},
                "type": "ParseJson"
            },
            "Send_Summary_Email_to_Bride": {
                "inputs": {
                    "body": {
                        "Body": "<p>Dear @{body('Parse_JSON')['brideName']},<br>Thank you for submitting your marriage intent registration form. We are pleased to inform you that your details have been successfully received and will be processed accordingly.</p><br><p>Below is a summary of your submission:</p><ul><li>Bride's Name: @{body('Parse_JSON')['brideName']}</li><li>Bride's Genotype: @{body('Parse_JSON')['brideGenotype']}</li><li>Bride's Consent Status: @{body('Parse_JSON')['brideConsent']}</li><li>Groom's Name: @{body('Parse_JSON')['groomName']}</li><li>Groom's Genotype: @{body('Parse_JSON')['groomGenotype']}</li><li>Groom's Consent Status: @{body('Parse_JSON')['groomConsent']}</li><li>Wedding Date: @{body('Parse_JSON')['marriageDate']}</li></ul><p>Please check your email for update on the processi in the next 7 days. If you have any questions or require further assistance, please do not hesitate to contact us.</p><br><p>Best regards,</p><p>Marriage Data Management</p>",
                        "Importance": "Normal",
                        "Subject": "Confirmation of Marriage Intent Registration",
                        "To": "@{body('Parse_JSON')['brideEmail']}"
                    },
                    "host": {
                        "connection": {
                            "name": "@parameters('$connections')['outlook']['connectionId']"
                        }
                    },
                    "method": "post",
                    "path": "/v2/Mail"
                },
                "runAfter": {
                    "Create_blob_(V2)": [
                        "Succeeded"
                    ]
                },
                "type": "ApiConnection"
            },
            "Send_Summary_Email_to_Groom": {
                "inputs": {
                    "body": {
                        "Body": "<p>Dear @{body('Parse_JSON')['groomName']},</p><p>Thank you for submitting your marriage intent registration form. We are pleased to inform you that your details have been successfully received and will be processed accordingly.</p><br><p>Below is a summary of your submission:</p><ul><li>Bride's Name: @{body('Parse_JSON')['brideName']}</li><li>Bride's Genotype: @{body('Parse_JSON')['brideGenotype']}</li><li>Bride's Consent Status: @{body('Parse_JSON')['brideConsent']}</li><li>Groom's Name: @{body('Parse_JSON')['groomName']}</li><li>Groom's Genotype: @{body('Parse_JSON')['groomGenotype']}</li><li>Groom's Consent Status: @{body('Parse_JSON')['groomConsent']}</li><li>Wedding Date: @{body('Parse_JSON')['marriageDate']}</li></ul><p>Please check your email for update on the processi in the next 7 days. If you have any questions or require further assistance, please do not hesitate to contact us.</p><br><p>Best regards,</p><p>Marriage Data Management</p>",
                        "Importance": "Normal",
                        "Subject": "Confirmation of Marriage Intent Registration",
                        "To": "@{body('Parse_JSON')['groomEmail']}"
                    },
                    "host": {
                        "connection": {
                            "name": "@parameters('$connections')['outlook']['connectionId']"
                        }
                    },
                    "method": "post",
                    "path": "/v2/Mail"
                },
                "runAfter": {
                    "Create_blob_(V2)": [
                        "Succeeded"
                    ]
                },
                "type": "ApiConnection"
            }
        },
        "contentVersion": "1.0.0.0",
        "outputs": {},
        "parameters": {
            "$connections": {
                "defaultValue": {},
                "type": "Object"
            }
        },
        "triggers": {
            "When_a_HTTP_request_is_received": {
                "inputs": {
                    "schema": {
                        "properties": {
                            "properties": {
                                "properties": {
                                    "brideBloodGroup": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "brideConsent": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "brideDob": {
                                        "properties": {
                                            "format": {
                                                "type": "string"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "brideEmail": {
                                        "properties": {
                                            "format": {
                                                "type": "string"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "brideGenotype": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "brideMaritalStatus": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "brideName": {
                                        "properties": {
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomBloodGroup": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomConsent": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomDob": {
                                        "properties": {
                                            "format": {
                                                "type": "string"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomEmail": {
                                        "properties": {
                                            "format": {
                                                "type": "string"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomGenotype": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomMaritalStatus": {
                                        "properties": {
                                            "enum": {
                                                "items": {
                                                    "type": "string"
                                                },
                                                "type": "array"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "groomName": {
                                        "properties": {
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    },
                                    "marriageDate": {
                                        "properties": {
                                            "format": {
                                                "type": "string"
                                            },
                                            "type": {
                                                "type": "string"
                                            }
                                        },
                                        "type": "object"
                                    }
                                },
                                "type": "object"
                            },
                            "required": {
                                "items": {
                                    "type": "string"
                                },
                                "type": "array"
                            },
                            "type": {
                                "type": "string"
                            }
                        },
                        "type": "object"
                    }
                },
                "kind": "Http",
                "type": "Request"
            }
        }
    },
    "parameters": {
        "$connections": {
            "value": {
                "azureblob": {
                    "connectionId": "/subscriptions/236dd705-beed-4691-ba82-fd43a607e484/resourceGroups/LogicHut/providers/Microsoft.Web/connections/azureblob",
                    "connectionName": "azureblob",
                    "id": "/subscriptions/236dd705-beed-4691-ba82-fd43a607e484/providers/Microsoft.Web/locations/uksouth/managedApis/azureblob"
                },
                "outlook": {
                    "connectionId": "/subscriptions/236dd705-beed-4691-ba82-fd43a607e484/resourceGroups/LogicHut/providers/Microsoft.Web/connections/outlook",
                    "connectionName": "outlook",
                    "id": "/subscriptions/236dd705-beed-4691-ba82-fd43a607e484/providers/Microsoft.Web/locations/uksouth/managedApis/outlook"
                }
            }
        }
    }
}
