<?php

// variable setting
$name = $_REQUEST['Name'];
$course = $_REQUEST['Course'];
$overall_satisfaction = $_REQUEST['table_two'];
$training_attended = $_REQUEST['qu_two'];
$reason = $_REQUEST['Reason'];
$training_venue = $_REQUEST['venue'];
$ease_of_reg = $_REQUEST['ease'];
$date_of_training = $_REQUEST['date'];
$quality_of_presenters = $_REQUEST['quality'];
$quality_of_food = $_REQUEST['food'];
$quality_of_acc = $_REQUEST['accommodations'];
$reg_fees = $_REQUEST['fees'];
$reco = $_REQUEST['reco'];
$comments = $_REQUEST['comments'];


// Creating Email Message
$mail_body = "Name: ".$name."\nTraining or Course: ".$course."\nOverall Satisfaction: ".$overall_satisfaction."\nHave you attended this training before? ".$training_attended."\nFor what reason did you attend this training? ".$reason."\nTraining venue: ".$training_venue."\nEase of Registration: ".$ease_of_reg."\nDate of Training: ".$date_of_training."\nQuality of presenters: ".$quality_of_presenters."\nQuality of Food: ".$quality_of_food."\nQuality of Accomodations: ".$quality_of_acc."\nRegistration Fees: ".$reg_fees."\nWould you recommend this training to others: ".$reco."\nComments: ".$comments;






//check input fields
if (empty($name) || empty($course) || empty($overall_satisfaction) || empty($training_attended) || empty($reason) || empty($traning_venue) || empty($ease_of_reg) || empty($date_of_training) || empty($quality_of_presenters) || empty($quality_of_food) || empty($quality_of_acc) || empty($reg_fees) || empty($reco))
{
	echo "Please fill all the fields";
}
else
{
	mail("tathagata2403@gmail.com", "Feedback by ".$name , $mail_body);
	echo "<script type='text/javascript'>alert('Form has been submitted successfully');
	    window.history.log(-1);
	</script>";
}


?>