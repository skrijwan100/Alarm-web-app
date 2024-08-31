from flask import render_template,Flask,request,redirect
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///set_alarm.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)

class Alarm(db.Model):
    sno=db.Column(db.Integer,primary_key=True)
    time=db.Column(db.String(10),nullable=False)

    def __repr__(self) -> str:
        return f"{self.sno} - {self.time}"
with app.app_context():
    db.create_all()

@app.route("/",methods=['POST','GET'])
def Home():
    if request.method=='POST':
        Hours=request.form['hours']
        Minutes=request.form['minet']
        ap=request.form['ap']
        usertime = f"{Hours}:{Minutes} {ap}"  # Combine hours, minutes, and AM/PM
        alarm = Alarm(time=usertime)
        db.session.add(alarm)
        db.session.commit()
        print(alarm)
    allalarm=Alarm.query.all()
    return render_template('index.html',allalarm=allalarm)

@app.route("/delete/<int:sno>")
def deletetable(sno):
    deletealarm=Alarm.query.filter_by(sno=sno).first()
    db.session.delete(deletealarm)
    db.session.commit()
    return redirect('/')
    




if(__name__=="__main__"):
    app.run(debug=True,port=1000)