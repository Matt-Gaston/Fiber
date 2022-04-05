import os
import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import *
import time
import csv, json

dlPath = os.path.join(os.getenv("USERPROFILE"), "Downloads", "Export.csv")

if (os.path.exists(dlPath)):
    os.remove(dlPath)

try:
    uname = "user name here"
    pw = "pw here"
    driver = webdriver.Chrome()
    driver.get("https://rollamugis.integritygis.com/H5/Index.html?viewer=rollamu#")

    #logging in
    try:
        wait = WebDriverWait(driver, 20, poll_frequency=2, ignored_exceptions=[NoSuchElementException, TimeoutException])
        UserName_box = wait.until(EC.presence_of_element_located((By.ID, "UserName")))
    finally:
        print("found")

        # UserName_box = driver.find_element_by_id("UserName")

        Password_box = driver.find_element(by=By.ID, value="Password")

        UserName_box.send_keys(uname)
        Password_box.send_keys(pw)

        login_button = driver.find_element(by=By.XPATH, value="/html/body/section/form/div/div[5]/input")
        login_button.click()


    try:
        wait = WebDriverWait(driver, 40, poll_frequency=10, ignored_exceptions=[NoSuchElementException, TimeoutException])
        aBtn = wait.until(EC.element_to_be_clickable((By.XPATH, "//*[@id=\"modal-description\"]/div[4]/div/div[3]/div/div/form/div[2]/button[2]")))
    finally:
        aBtn.click()


    try:
        wait = WebDriverWait(driver, 10, poll_frequency=1, ignored_exceptions=[NoSuchElementException, TimeoutException])
        searchBtn = wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[1]/div/div[1]/div/div[1]/div[4]/div/div/div[1]/ul[1]/li[2]/button")))
    finally:
        searchBtn.click()


    try:
        wait = WebDriverWait(driver, 10, poll_frequency=1, ignored_exceptions=[NoSuchElementException, TimeoutException])
        queryBtn = wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[1]/div/div[1]/div/div[1]/div[4]/div/div/div[2]/div[2]/ul/li[2]/div/ul/li[1]/button")))
    finally:
        queryBtn.click()


    try:
        wait = WebDriverWait(driver, 20, poll_frequency=3, ignored_exceptions=[NoSuchElementException, TimeoutException])
        wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div[2]/div[6]/div/div[3]/div[1]/div[2]/div[1]/div[1]/div[1]/label/select")))
        fsSelectBox = Select(driver.find_element(by=By.XPATH, value="/html/body/div[1]/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div[2]/div[6]/div/div[3]/div[1]/div[2]/div[1]/div[1]/div[1]/label/select"))
    finally:
        fsSelectBox.select_by_visible_text("Fiber Structure")

    time.sleep(1)

    try:
        wait = WebDriverWait(driver, 10, poll_frequency=1, ignored_exceptions=[NoSuchElementException, TimeoutException])
        wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div[2]/div[6]/div/div[3]/div[1]/div[2]/div[1]/div[1]/div[5]/div[2]/div/ul[1]/li/div/div[1]/div/label[1]/select")))
        nameSelectBox = Select(driver.find_element(by=By.XPATH, value="/html/body/div[1]/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div[2]/div[6]/div/div[3]/div[1]/div[2]/div[1]/div[1]/div[5]/div[2]/div/ul[1]/li/div/div[1]/div/label[1]/select"))
    finally:
        nameSelectBox.select_by_visible_text("Name")

    time.sleep(1)

    try:
        wait = WebDriverWait(driver, 10, poll_frequency=1, ignored_exceptions=[NoSuchElementException, TimeoutException])
        searchBtn = wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[1]/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div[2]/div[6]/div/div[3]/div[1]/div[2]/div[1]/div[2]/button[3]")))
    finally:
        searchBtn.click()

    time.sleep(10)

    try:
        wait = WebDriverWait(driver, 10, poll_frequency=1, ignored_exceptions=[NoSuchElementException, TimeoutException])
        linesBtn = wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[1]/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div[2]/div[5]/div/div[1]/div[1]/button[4]")))
    finally:
        linesBtn.click()


    try:
        wait = WebDriverWait(driver, 10, poll_frequency=1, ignored_exceptions=[NoSuchElementException, TimeoutException])
        exportCSVBTN = wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[1]/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div[2]/div[5]/div/div[1]/div[2]/div/ul/li[5]/button")))
    finally:
        exportCSVBTN.click()


    try:
        wait = WebDriverWait(driver, 10, poll_frequency=1, ignored_exceptions=[NoSuchElementException, TimeoutException])
        downLOKBTN = wait.until(EC.element_to_be_clickable((By.XPATH, "//*[@id=\"modal-description\"]/div[6]/div/div/button[1]")))
    finally:
        downLOKBTN.click()

except:
    print("A problem occured while updating")
    print("please close out and try again in a few seconds")
else:
    time.sleep(5)
    driver.quit()
    print("Download succeeded")


    ############
    # Update data.js from downloads
    ############

    time.sleep(5)

    try:
        dlPath = os.path.join(os.getenv("USERPROFILE"), "Downloads", "Export.csv")
        data = []
        with open(dlPath, 'r') as f:
            freader = csv.DictReader(f, delimiter=',', quotechar='"')
            for row in freader:
                if row['Name'] and row['Latitude'] and row['Longitude']:
                    newR = {"Name":row['Name'], "coords":{"lat":row['Latitude'], "lng":row['Longitude']}}
                    data.append(newR)
        with open('data.js', 'w') as dataf:
            jsonString = json.dumps(data, indent = 4)
            dataf.write('var data = ' + jsonString + ';\nexport default data;')
        
        os.remove(dlPath)
    except:
        print("something went wrong while reading export.csv or writing to data.js")
        print("press enter to close")
        input()
    else:
        print("updated data successfully")
        print("press enter to close")
        input()
        sys.exit()