import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "./ui/button"
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { BeatLoader } from "react-spinners"
import Error from "./error"
import {Input} from "./ui/input";
import { login } from "@/db/apiAuth";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { UrlState } from "@/context";

  
const Login = () => {
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
  
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prevState) =>({
            ...prevState,
            [name]: value,
        }));
    }

    const {data, error, loading, fn:fnLogin} = useFetch(login, formData);
    const {fetchUser} = UrlState();
  4
    useEffect(() => {
      if (error === null && data) {
        // fetchUser();
        navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        fetchUser();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, data]);

    const handleLogin = async () => {
        setErrors([])
        try{
            const schema = Yup.object().shape({
                email:Yup.string().email("Invalid Email").required("Email is required"),
                password: Yup.string().min(5, "Password must be 5 character").required("Password is required"),
            });

            await schema.validate(formData, {abortEarly: false});
            await fnLogin();
        }catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
              newErrors[err.path] = err.message;
            });
      
            setErrors(newErrors);
        }
    }

  return (
        <Card>
  <CardHeader>
    <CardTitle>Login</CardTitle>
    <CardDescription>to your account if you already have one</CardDescription>
    {error && <Error message={error.email} />}
  </CardHeader>
  <CardContent className="space-y-2">
    <div className="space-y-1">

        <Input name="email" type="email" placeholder="Enter Email" onChange={handleInputChange}/>
        {errors.email && <Error message={errors.email} />}
    </div>
    <div className="space-y-1">
        <Input name="password" type="password" placeholder="Enter Password"  onChange={handleInputChange} />
        {errors.password && <Error message={errors.password} />}
    </div>
  </CardContent>
  <CardFooter>
   <Button onClick={handleLogin}> {loading? <BeatLoader size={10} color="#36d7b7"/>:"Login"}</Button>
  </CardFooter>
</Card>

  )
}

export default Login