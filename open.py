import requests

token_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY5NzA4MzIwLCJpYXQiOjE3Njg4NDQzMjAsImp0aSI6ImJhNDU0NThlYWVlMTQ5NWNiOTA1YTdhOTk1MTBlN2U1IiwidXNlcl9pZCI6MTkxNiwidXNlcl90eXBlIjoyfQ.y3G5SO1PODieiwLhbpFQ3FeDce96CAbS9OGK5XP39hM"

user_type = 1  # Example user type

url = "https://superadmin.ukiu.uz/api/user/"

headers = {
    "Authorization": f"Bearer {token_jwt}",
    "Content-Type": "application/json"
}
data = {
    "user_type": user_type
}
response = requests.patch(url, json=data, headers=headers)
print(response.status_code)
print(response.json())