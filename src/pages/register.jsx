import Image from 'next/image'
import { useFormik } from "formik"
import * as Yup from 'yup'

import TeaBush from '../../public/tea-bush.jpg'
import styles from '../../styles/Form.module.css';
import Link from 'next/link';

export default function register() {

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        }, 
        //validate form 
        validationSchema: Yup.object({
            email: Yup.string()
                .email('invaild email adress')
                .required("email is required"),
            firstName: Yup.string()
                .required('First name is required'),
            lastName: Yup.string()
                .required('Last name is required'),
            password: Yup.string()
                .min(6, "password must be at least 6 characters long")
                .required('password is required')
        }),
        onSubmit: (values) => {
            
            router.push({pathname: '/', query: 'success'})
        }
    })



  return (
    <div className={styles.FormWrapper}>
    <form className={styles.FormContainer} action="">
        <div className={styles.FormInputContainer}>
            <h2>Register</h2>

            <div className={styles.FormInput}>
                <label htmlFor="">Email</label>
                <input type="text" placeholder='Enter your Email'/>
            </div>
            <div className={styles.FormInput}>
                <label htmlFor="">First Name</label>
                <input type="text" placeholder='Enter first name'/>
            </div>
            <div className={styles.FormInput}>
                <label htmlFor="">Last Name</label>
                <input type="text" placeholder='Enter last name'/>
            </div>

            <div className={styles.FormInput}>
                <label htmlFor="">Password</label>
                <input type="password" placeholder='Enter your Password'/>
            </div>
            <div className={styles.FormInput}>
                <label htmlFor="">Comfirm Password</label>
                <input type="password" placeholder='Re-enter your Password'/>
            </div>

            <div className={styles.FormLinkContainer}>
                <p>Already have an account <Link className={styles.FormLink} href='/login'>Login Here</Link></p>
            </div>
     
            <button className={styles.FormButton}>Register</button>

        </div>
        <div className={styles.FormImageContainer}>
            <Image className={styles.FormImage} src={TeaBush} alt="Display of coffee cup on coffee beans"/>
        </div>
    </form>
</div>
  )
}
