from tkinter import *
import time
from tkinter.filedialog import askopenfilename
from tkinter.filedialog import asksaveasfilename
#from tkinter import Entry
#from tkinter import Button
#from tkinter import StringVar
import matplotlib.pyplot as plt
import csv
import math
print('SET OF INSTRUCTIONS ARE AS FOLLOWS:\n')
print('1.SOON A GRAPHICAL WINDOW WILL APPEAR.')
print('2.THIS IS THE OFFICIAL MODULE TO DRAW POLAR GRAPHS.')
print('3.GIVE INPUT THE FILE.')
print('4.CHOOSE SAVING NAME OF CSV AND GRAPH.')
print('5.AND AT LAST WRITE THE NAME OF VIRUS.')
root=Tk()
root.geometry('600x400')
root.title('Polar Plot Software')
lab1=Label(root,text='Plotting Set of Fast Sequences in Polar Co-ordinate Method',font='Timesnewroman 15 bold',fg='Brown').pack()
lab2=Label(root,text='By Centre for Interdisciplinary Research and Education',font='comicsans 12 bold',bg='yellow',fg='black').pack()
lab5=Label(root,text='\n\n').pack()
fr1=Frame(root,bg='black',padx=5).pack(fill='x')
lab3=Label(fr1,text='Choose Input Fasta Sequence from Dialogue Box and Save Csv Data File and png Graph.',fg='black',font='arial 10 bold italic',padx=10,pady=5).pack()
lab4=Label(fr1,text='Then a Input bos will appear. Enter the name of Virus as for title purpose',fg='black',font='arial 12 bold italic',padx=10,pady=5).pack()
fr2=Frame(root,bg='black',padx=5).pack(fill='x')
lab6=Label(root,text='developed by Tathagata Dey',font='Algerian 12',fg='black').pack(side='bottom',anchor='se')
time.sleep(20)
root.filename=askopenfilename(filetypes=(),title='Select File to open')
'''

def savecsv():
    fout=open()


csvname=Stringvar()
pngname=Stringvar()

l1=Label(root,text='Enter CSV Output File Name:').grid()
l2=Label(root,text='Enter PNG Output File Name:').grid()

e1=Entry(root,textvariable=csvname)
e2=Entry(root,textvariable=pngname)
b1=Button(root,text='Submit',command=savecsv)
'''
f=open(root.filename)
c=f.read()
cds=[]
data=[]
l=c.split('>')[1:]
for i in range(len(l)):
    t=l[i].split('|')
    s=t[-1]
    t.pop(-1)
    t.append('')
    k=0
    for i in s:
        if i=='\n':
            break
        else:
            t[-2]+=i
        k+=1
    data.append(t)
    cds.append(s[k:].replace('\n',''))





(plotx,ploty,sumx,sumy,total,unknown,qrval)=([],[],[],[],[],[],[])

def polar(s):
    seq=s.upper()
    a=0
    x=0
    y=0
    cox=[0]
    coy=[0]
    qrx=0
    qry=0
    qr=0
    z=0
    n=0

    amino=['E','A','C','V','F','L','I','W','M','T','Y','G','Q','R','N','P','H','K','D','S']
    angle={}

    k=0
    for i in range(0,360,18):
        angle[amino[k]]=i
        k+=1


    for i in range(len(seq)):
        if seq[i] in amino:
            a=angle[seq[i]]

            x+=math.cos(((math.pi)/180)*a)
            y+=math.sin(((math.pi)/180)*a)
            qrx+=x
            qry+=y
            n+=1

            cox.append(x)
            coy.append(y)
        elif seq[i]==' ':
            pass
        elif seq[i]=='\n':
            pass
        else:
            z+=1

    qr=(((qrx/n)**2)+((qry/n)**2))**0.5
    plotx.append(cox)
    ploty.append(coy)
    sumx.append(qrx)
    sumy.append(qry)
    total.append(n)
    unknown.append(z)
    qrval.append(qr)



m=0
for i in range(len(data)):
    m=max(m,len(data[i]))
for i in range(len(data)):
    if len(data[i])<m:
        while len(data[i])!=m:
            data[i].append('')




for i in range(len(cds)):
    polar(cds[i])
    data[i].append(total[-1])
    data[i].append(unknown[-1])
    data[i].append(sumx[-1])
    data[i].append(sumy[-1])
    data[i].append(qrval[-1])


root.csvname=asksaveasfilename(filetypes=(),title='Save The Csv Data File As')
fout=open(root.csvname+'.csv','w',newline='')
w=csv.writer(fout)

l=['']*m
l.append('Total Length')
l.append('Unknown Bases')
l.append('Sumx')
l.append('Sumy')
l.append('Qr Value')

w.writerow(l)

for i in data:
    w.writerow(i)
fout.close()


root.pngname=asksaveasfilename(filetypes=(),title='Save The Png Graph File As')
fig=plt.figure(figsize=(105,85))

virusname=StringVar()
def naming():
    plt.title('Polar Co-ordinate Representation of '+vname.get(),fontsize=105)
l=Label(root,text='\n\nEnter Virus Name ',font='Georgia 20',fg='blue').pack()  
vname=Entry(root,bg='gray',textvariable=virusname).pack()
b=Button(root,text='Submit',command=naming).pack()


plt.tick_params(axis="x", labelsize=70)
plt.tick_params(axis="y", labelsize=70)

for i in range(len(plotx)):
    fig=plt.plot(plotx[i],ploty[i],label=str(data[i][0])+str(total[i]),linewidth=5)
    
plt.legend(prop={'size':90})
plt.savefig(root.pngname+'.png')   



















