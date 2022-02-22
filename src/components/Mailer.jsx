import './mailer.css';
import emailjs from "emailjs-com";
import React, { useEffect, useRef } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

export default function Mailer() {
    const form = useRef();

    useEffect(() => {
        alanBtn({
            key: '529f3d2462ad5e08c1386ac5152de8472e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                console.log(commandData);
                
                if (commandData.command === 'sender') {
                    form.current.from_email.value = commandData.data;
                }
                if (commandData.command === 'reciever') {
                    form.current.to_email.value = commandData.data;
                }
                if (commandData.command === 'myName') {
                    form.current.from_name.value = commandData.data;
                }
                if (commandData.command === 'subject') {
                    form.current.subject.value = commandData.data;
                }
                if (commandData.command === 'message') {
                    async function sendEmail() {
                        form.current.message.value = await commandData.data;
                        console.log(form.current);
                        emailjs.sendForm('service_25cnirb', 'template_l42qspc', form.current , 'user_3TgrzvbtVAHzifsBtaHGz')
                        .then((result) => {
                            console.log(result.text);
                        }, (error) => {
                            console.log(error.text);
                        });
                    }
                    sendEmail();
                }
            }
        });
      }, []);
    function sendEmail(e) {
        e.preventDefault();
        console.log(form.current.from_name.value);
        emailjs.sendForm('service_25cnirb', 'template_l42qspc', form.current , 'user_3TgrzvbtVAHzifsBtaHGz')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
    }

    return(
        <div className='mailer'>
            <h1 className='mailerHeading'>Voice Mailer</h1>
            <h6 className='mailerSubHeading'>mail will be sent with with my personal id (as app is for personal use)</h6>
            <div className="container border">
            <form className='submitForm' onSubmit={sendEmail} ref={form} >
                    <div className="row pt-5 mx-auto">
                        <div className="col-8 form-group mx-auto">
                            <input type="text" className="form-control" placeholder="Your Name" name="from_name"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Your Email Address" name="from_email"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Reciever Email Address" name="to_email"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Subject" name="subject"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="Send Message"></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}