define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/url/db/connection/test",
    "title": "check connection with database",
    "version": "1.0.0",
    "name": "check_connection_with_database",
    "group": "admin",
    "parameter": {
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request GET http://<domain:port>/api/v1/url/db/connection/test",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Connection with database is successfully established\",\n     \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "custom-url-shortner/application_server/controllers/application/controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/v1/url",
    "title": "create new entry for shorten url",
    "version": "1.0.0",
    "name": "create_new_entry_for_shorten_url",
    "group": "admin",
    "parameter": {
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request GET http://<domain:port>/api/v1/url",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"New shorten url entry created\",\n     \"data\": {\n       \"url\": {\n          \"_id\": \"5e7a33a638b79200123772a1\",\n          \"originalURL\": \"https://www.google.co.in\",\n          \"shortURL\": \"http://<domain>/google\",\n          \"URLCode\": \"google\",\n          \"createdAt\": \"2020-03-24T16:21:58.953Z\",\n          \"updatedAt\": \"2020-03-24T16:21:58.953Z\",\n          \"__v\": 0\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "custom-url-shortner/application_server/controllers/application/controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "delete",
    "url": "/api/v1/url/item",
    "title": "delete all shorten URL entries",
    "version": "1.0.0",
    "name": "delete_all_shorten_URL_entries",
    "group": "admin",
    "parameter": {
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request DELETE http://<domain:port>/api/v1/url",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"URL deleted\",\n     \"data\": {\n       \"url\": {\n          \"n\": 1,\n          \"ok\": 1,\n          \"deletedCount\": 1\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "custom-url-shortner/application_server/controllers/application/controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "delete",
    "url": "/api/v1/url/item",
    "title": "delete shorten URL entry",
    "version": "1.0.0",
    "name": "delete_shorten_URL_entry",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shorten URL Entry ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request DELETE http://<domain:port>/api/v1/url/item \\\n --data-urlencode 'id=5e7a33a638b79200123772a1' \\",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"URL deleted\",\n     \"data\": {\n       \"url\": {\n          \"_id\": \"5e7a33a638b79200123772a1\",\n          \"originalURL\": \"https://www.google.co.in\",\n          \"shortURL\": \"http://<domain>/google\",\n          \"URLCode\": \"google\",\n          \"createdAt\": \"2020-03-24T16:21:58.953Z\",\n          \"updatedAt\": \"2020-03-24T16:21:58.953Z\",\n          \"__v\": 0\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "custom-url-shortner/application_server/controllers/application/controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/v1/url",
    "title": "get all shorten url entries",
    "version": "1.0.0",
    "name": "get_all_shorten_url_entries",
    "group": "admin",
    "parameter": {
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request GET http://<domain:port>/api/v1/url",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Items found\",\n     \"data\": {\n        \"items\": [\n            {\n                \"_id\": \"5e7a33a638b79200123772a1\",\n                \"originalURL\": \"https://www.google.co.in\",\n                \"shortURL\": \"http://192.168.99.101/google\",\n                \"URLCode\": \"google\",\n                \"createdAt\": \"2020-03-24T16:21:58.953Z\",\n                \"updatedAt\": \"2020-03-24T16:21:58.953Z\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"6f8b44b749c80311234883b2\",\n                \"originalURL\": \"https://github.com/adisakshya\",\n                \"shortURL\": \"http://192.168.99.101/adi\",\n                \"URLCode\": \"adi\",\n                \"createdAt\": \"2020-03-24T16:41:20.489Z\",\n                \"updatedAt\": \"2020-03-24T16:41:20.489Z\",\n                \"__v\": 0\n            }\n        ]\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "custom-url-shortner/application_server/controllers/application/controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/v1/url/item",
    "title": "get shorten url details by ID",
    "version": "1.0.0",
    "name": "get_shorten_url_details_by_ID",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shorten URL Entry ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request GET http://<domain:port>/api/v1/url/item?id=ShortenURLEntryID",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"URL ID found\",\n     \"data\": {\n       \"url\": {\n          \"_id\": \"6f8b44b749c80311234883b2\",\n          \"originalURL\": \"https://github.com/adisakshya\",\n          \"shortURL\": \"http://<domain>/adi\",\n          \"URLCode\": \"adi\",\n          \"createdAt\": \"2020-03-24T16:41:20.489Z\",\n          \"updatedAt\": \"2020-03-24T16:41:20.489Z\",\n          \"__v\": 0\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "custom-url-shortner/application_server/controllers/application/controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/v1/url/item/urlcode",
    "title": "get shorten url details by URLCode",
    "version": "1.0.0",
    "name": "get_shorten_url_details_by_URLCode",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "URLCode",
            "description": "<p>URLCode corresponding to shorten URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request GET http://<domain:port>/api/v1/url/item/urlcode?URLCode=ShortenURLCode",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"URL Code found\",\n     \"data\": {\n       \"url\": {\n          \"_id\": \"6f8b44b749c80311234883b2\",\n          \"originalURL\": \"https://github.com/adisakshya\",\n          \"shortURL\": \"http://<domain>/adi\",\n          \"URLCode\": \"adi\",\n          \"createdAt\": \"2020-03-24T16:41:20.489Z\",\n          \"updatedAt\": \"2020-03-24T16:41:20.489Z\",\n          \"__v\": 0\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "custom-url-shortner/application_server/controllers/application/controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/v1/url/item/originalurl",
    "title": "get shorten url details by originalurl",
    "version": "1.0.0",
    "name": "get_shorten_url_details_by_originalurl",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "originalurl",
            "description": "<p>Original URL corresponding to shorten URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request GET http://<domain:port>/api/v1/url/item/urlcode?originalurl=OriginalURL",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"Original URL found\",\n     \"data\": {\n       \"url\": {\n          \"_id\": \"6f8b44b749c80311234883b2\",\n          \"originalURL\": \"https://github.com/adisakshya\",\n          \"shortURL\": \"http://<domain>/adi\",\n          \"URLCode\": \"adi\",\n          \"createdAt\": \"2020-03-24T16:41:20.489Z\",\n          \"updatedAt\": \"2020-03-24T16:41:20.489Z\",\n          \"__v\": 0\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "custom-url-shortner/application_server/controllers/application/controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "put",
    "url": "/api/v1/url/update/originalurl",
    "title": "update original URL corresponding to shorten URL",
    "version": "1.0.0",
    "name": "update_original_URL_corresponding_to_shorten_URL",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shorten URL Entry ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "originalurl",
            "description": "<p>Original URL corresponding to shorten URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request PUT http://<domain:port>/api/v1/url/update/originalurl \\\n --data-urlencode 'id=6f8b44b749c80311234883b2' \\\n --data-urlencode 'originalURL=https://github.com'",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"URL updated\",\n     \"data\": {\n       \"url\": {\n          \"_id\": \"6f8b44b749c80311234883b2\",\n          \"originalURL\": \"https://github.com\",\n          \"shortURL\": \"http://<domain>/adi\",\n          \"URLCode\": \"adi\",\n          \"createdAt\": \"2020-03-24T16:41:20.489Z\",\n          \"updatedAt\": \"2020-03-24T16:41:20.489Z\",\n          \"__v\": 0\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "custom-url-shortner/application_server/controllers/application/controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "put",
    "url": "/api/v1/url/update/urlcode",
    "title": "update urlcode corresponding to shorten URL",
    "version": "1.0.0",
    "name": "update_urlcode_corresponding_to_shorten_URL",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shorten URL Entry ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "URLCode",
            "description": "<p>URLCode corresponding to shorten URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request PUT http://<domain:port>/api/v1/url/update/urlcode \\\n --data-urlencode 'id=6f8b44b749c80311234883b2' \\\n --data-urlencode 'URLCode=github'",
          "type": "String"
        },
        {
          "title": "response-example",
          "content": "\n{\n     \"success\": true,\n     \"error\": false,\n     \"message\": \"URL updated\",\n     \"data\": {\n       \"url\": {\n          \"_id\": \"6f8b44b749c80311234883b2\",\n          \"originalURL\": \"https://github.com/adisakshya\",\n          \"shortURL\": \"http://<domain>/adi\",\n          \"URLCode\": \"github\",\n          \"createdAt\": \"2020-03-24T16:41:20.489Z\",\n          \"updatedAt\": \"2020-03-24T16:41:20.489Z\",\n          \"__v\": 0\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "custom-url-shortner/application_server/controllers/application/controller.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/:code",
    "title": "redirect to original URL corresponding to shorten URL",
    "version": "1.0.0",
    "name": "redirect_to_original_URL_corresponding_to_shorten_URL",
    "group": "all",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>URLCode corresponding to shorten URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "\ncurl --request GET http://<domain:port>/exampleURLCode",
          "type": "String"
        }
      ]
    },
    "filename": "custom-url-shortner/application_server/controllers/main/controller.js",
    "groupTitle": "all"
  }
] });
