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
import { signup } from "@/db/apiAuth";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { UrlState } from "@/context";


const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
      name: "",  
      email: "",
      password: "",
      profile_pic: null,
  });

  const handleInputChange = (e) =>{
      const {name, value, files} = e.target;
      setFormData((prevState) =>({
          ...prevState,
          [name]: files? files[0]: value,
      }));
  }

  const {loading, error, fn: fnSignup, data} = useFetch(signup, formData);
  const {fetchUser} = UrlState();
4
  useEffect(() => {
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      // fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  const handleSignup = async () => {
      setErrors([]);
      try{
          const schema = Yup.object().shape({
              name: Yup.string().required("Name is required"),
              email:Yup.string().email("Invalid Email").required("Email is required"),
              password: Yup.string().min(6, "Password must be 5 character").required("Password is required"),
              profile_pic: Yup.mixed().required("Profile picture is required"),
          });

          await schema.validate(formData, {abortEarly: false});
          await fnSignup();
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
  <CardTitle>SignUp</CardTitle>
  <CardDescription>Create a new account if you haven&rsquo;t already</CardDescription>
  {error && <Error message={error.message} />}
</CardHeader>
<CardContent className="space-y-2">
  <div className="space-y-1">
      <Input name="name" type="text" placeholder="Enter Name" onChange={handleInputChange}/>
      {errors.name && <Error message={errors.name} />}
      <Input name="email" type="email" placeholder="Enter Email" onChange={handleInputChange}/>
      {errors.email && <Error message={errors.email} />}
  </div>
  <div className="space-y-1">
      <Input name="password" type="password" placeholder="Enter Password"  onChange={handleInputChange} />
      {errors.password && <Error message={errors.password} />}
  </div>
  <div className="space-y-1">
      <Input name="profile_pic" type="file" accept="image/*"  onChange={handleInputChange} />
      {errors.profile_pic && <Error message={errors.profile_pic} />}
  </div>
</CardContent>
<CardFooter>
 <Button onClick={handleSignup}> {loading? <BeatLoader size={10} color="#36d7b7"/>:"Create account"}</Button>
</CardFooter>
</Card>

)
}

export default Signup