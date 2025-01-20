import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import css from './ContactForm.module.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';


const ContactForm = () => {
    const dispatch = useDispatch();
    
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Мінімум 3 символи')
      .max(50, 'Максимум 50 символів')
      .required("Це поле обов'язкове!"),
    number: Yup.string()
      .matches(
        /^[+\d][\d\s()-]*$/,
        'Це поле може містити лише числа, пробіли, дужки та символ +'
      )
      .required("Це поле обов'язкове!"),
  });

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const newContact = { id: nanoid(), ...values };
         dispatch(addContact(newContact));
        resetForm();
      }}
    >
      {() => (
        <Form className={css.form}>
          <label>
            Name
            <Field
              type="text"
              name="name"
              className={css.input}
              placeholder="Введіть ім'я"
            />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>

          <label>
            Number
            <Field
              type="text"
              name="number"
              className={css.input}
              placeholder="Введіть номер телефону"
            />
            <ErrorMessage name="number" component="div" className={css.error} />
          </label>

          <button type="submit" className={css.button}>
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
