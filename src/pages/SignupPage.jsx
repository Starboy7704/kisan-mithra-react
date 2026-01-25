import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, useLocation } from "react-router"
import { useState, useEffect } from "react"
import AppwriteAccount from "../Appwrite/Account.Services"
import { APPWRITE_USERPROFILES_TABLE_ID } from "../Utils/Appwrite/constants.js"
import { ID, TablesDB } from "appwrite"
import AppwriteTablesDB from "../Appwrite/TableDB.services"

function SignupPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const appwriteAccount = new AppwriteAccount();
  const appwriteTablesDb = new AppwriteTablesDB();

  const role = location.state?.role

  // Common fields
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Role-specific fields
  const [locationField, setLocationField] = useState("")
  const [landSize, setLandSize] = useState("")
  const [crops, setCrops] = useState("")

  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")

  const [qualification, setQualification] = useState("")
  const [experience, setExperience] = useState("")
  const [specialization, setSpecialization] = useState("")

  // Protect route
  useEffect(() => {
    if (!role) navigate("/loginSelection")
  }, [role, navigate])

  function handleNavigatelogin() {
    navigate("/login")
  }

  async function handleRegister() {
    const payload = {
      role,
      fullname,
      email,
      password,
    }

    if (role === "FARMER") {
      payload.extra = {
        location: locationField,
        landSize,
        crops,
      }
    }

    if (role === "CUSTOMER") {
      payload.extra = {
        address,
        phone,
      }
    }

    if (role === "AGRI_EXPERT") {
      payload.extra = {
        qualification,
        experience,
        specialization,
      }
    }

    console.log("REGISTER PAYLOAD 👉", payload)

    const result = await appwriteAccount.createAppwriteAccount(
      email,
      password,
      fullname,
      role,
    );
    await appwriteTablesDb.createRow(APPWRITE_USERPROFILES_TABLE_ID, {
      userId: result.$id,
      fullName: fullname,
      email: email,
      role: role,
    });


    if (result?.status) {
      navigate("/login")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-green-50 to-emerald-100 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            Register as{" "}
            <span className="text-green-600 capitalize">
              {role?.toLowerCase().replace("_", " ")}
            </span>
          </CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={handleNavigatelogin}>
              Log In
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Common Fields */}
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input value={fullname} onChange={(e) => setFullname(e.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {/* FARMER */}
            {role === "FARMER" && (
              <>
                <div className="grid gap-2">
                  <Label>Location</Label>
                  <Input value={locationField} onChange={(e) => setLocationField(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Land Size (acres)</Label>
                  <Input value={landSize} onChange={(e) => setLandSize(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Crops Grown</Label>
                  <Input value={crops} onChange={(e) => setCrops(e.target.value)} />
                </div>
              </>
            )}

            {/* CUSTOMER */}
            {role === "CUSTOMER" && (
              <>
                <div className="grid gap-2">
                  <Label>Address</Label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Phone</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </>
            )}

            {/* AGRI EXPERT */}
            {role === "AGRI_EXPERT" && (
              <>
                <div className="grid gap-2">
                  <Label>Qualification</Label>
                  <Input value={qualification} onChange={(e) => setQualification(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Experience (years)</Label>
                  <Input value={experience} onChange={(e) => setExperience(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Specialization</Label>
                  <Input value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                </div>
              </>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" onClick={handleRegister}>
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignupPage
