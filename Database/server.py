#!/usr/env python3
import http.server
import os
import logging
import http.server as server
import csv
import json


class Database:
    def __init__(self):
        self.filename = "/home/wiktor/PhpstormProjects/WebDev/Database/data.csv"

        # never forget the data being saved, even if program is restarted
        self.load()
        
    
    def add(self, data):
        print("adding")

        # add the data to the total then save it
        self.data.append(data)
        self.save()

    def save(self):
        with open(self.filename, 'w') as f:
            writer = csv.writer(f)
            writer.writerows(self.data)

        
    def load(self):
        with open(self.filename, 'r') as f:
            reader = csv.reader(f)
            self.data = list(reader)

    def get(self):
        return sorted(self.data, key=lambda x: int(x[5]), reverse=True)

# global database 
database = Database()



class HTTPRequestHandler(server.SimpleHTTPRequestHandler):
    """
    SimpleHTTPServer with added bonus of:

    - handle PUT requests
    - log headers in GET request
    """

    def do_GET(self):
        # server.SimpleHTTPRequestHandler.do_GET(self)
        # logging.warning(self.headers)

        # get the size of the body
        content = database.get()
        data = ""

        # seperate each row with a new line
        for row in content:
            data += f"{row[0]},{row[1]},{row[2]},{row[3]},{row[4]},{row[5]}\n"
    

        data = bytes(str(data), "utf-8")
        body_size = len(data)

        self.protocol_version = 'HTTP/1.0'
        self.send_response(200, "OK")
        self.send_header('Content-type', 'text/html')
        self.send_header("Content-Length", body_size)
        self.send_header("Access-Control-Allow-Origin", "*")

        self.end_headers()
        self.wfile.write(data)

        # return the data from the file ordered!
        print("SENDING DATA")
        print(data)
        print("SENT\n\n\n\n\n")

        # return data


    def do_POST(self):

        data = self.rfile.read(int(self.headers['Content-Length']))
        print(data)
        # read the message and convert it into a python dictionary
        content = json.loads(data)
        
        # split it into the individual parts
        username = content['username']
        skin = content['skin']
        eyes = content['eyes']
        mouth = content['mouth']
        totalScore = content['total']
        scorePerLevel = []

        for i in range(1, len(content) - 4):
            scorePerLevel.append(content[str(i)])

        # save it into file
        print(f"username: {username}")
        print(f"skin: {skin}")
        print(f"eyes: {eyes}")
        print(f"mouth: {mouth}")
        print(f"scorePerLevel: {scorePerLevel}")
        print(f"totalScore: {totalScore}")

        database.add([username, skin, eyes, mouth, scorePerLevel, totalScore])



    


if __name__ == '__main__':
    server.test(HandlerClass=HTTPRequestHandler)
