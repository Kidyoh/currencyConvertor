import requests

url = "https://api.apilayer.com/exchangerates_data/latest"

payload = {}
headers= {
  "apikey": "mTCITByknx60Lm0zpzNALooB0HI4AP76"
}

response = requests.request("GET", url, headers=headers, data = payload)

status_code = response.status_code
result = response.text