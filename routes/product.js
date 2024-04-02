const router = require("express").Router();
const RegisterController = require("../controller/RegisterController");
const ContactController = require("../controller/ContactController");
const CarbookingController = require("../controller/CarbookingController");
const FeedbackController = require("../controller/FeedbackController");
const AddCarController = require("../controller/AddCarController");
const StateController = require("../controller/StateController");
const DriverController = require("../controller/DriverController");
const ProfileController = require("../controller/ProfileController");





router.post("/regi", RegisterController.product_register);
router.get("/userdata", RegisterController.product_userdata);
router.post("/otp", RegisterController.sendOTP);
router.post("/forget", RegisterController.product_forget);

router.delete("/cdelete/:id", ContactController.contact_del);
router.post("/comment", ContactController.comment_data);
router.get("/commentdata", ContactController.comment_value);

router.get("/Gmaildata", CarbookingController.Gmail_data);
router.get("/mail", CarbookingController.mail_get);
router.post("/mailsent", CarbookingController.mail_sender);
router.post("/driversent", CarbookingController.driver_sender);
router.get("/Gmailupdateid/:id", CarbookingController.Gmail_updateid);
router.delete("/Gdelete/:id", CarbookingController.Gmail_del);
router.put("/gupdate/:id", CarbookingController.Gmail_update);

router.post("/feedback", FeedbackController.Feedback_sender);
router.get("/feedbackdata", FeedbackController.feedback_data);

router.post("/Addcar", AddCarController.car_data);
router.get("/Addcardata", AddCarController.car_value);
router.delete("/cardelete/:id", AddCarController.car_del);
router.put("/carup/:id", AddCarController.car_update);
router.get("/carupdate/:id", AddCarController.car_updateid);

router.post("/Statecar", StateController.state_data);
router.get("/Statedata", StateController.state_value);
router.delete("/statedelete/:id", StateController.state_de);

router.post("/Driver", DriverController.driver_data);
router.get("/Driverdata", DriverController.driver_value);
router.delete("/Driverdelete/:id", DriverController.driver_del);

router.put("/pupdate/:id", ProfileController.p_Update);
router.post("/Profile", ProfileController.Profile_data);
router.get("/profileupdate/:id", ProfileController.Profile_updateid);
router.get("/alldata", ProfileController.Profile_alldata);

module.exports = router;
