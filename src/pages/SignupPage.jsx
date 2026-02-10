import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import AppwriteAccount from "../Appwrite/Account.Services";
import AppwriteTablesDB from "../Appwrite/TableDB.services";
import AppwriteStorage from "../Appwrite/Storage.Services";

import {
  APPWRITE_USERPROFILES_TABLE_ID,
  APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
} from "../Utils/Appwrite/constants.js";

import toast from "react-hot-toast";

function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const appwriteAccount = new AppwriteAccount();
  const appwriteTablesDb = new AppwriteTablesDB();

  const role = location.state?.role;

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [locationField, setLocationField] = useState("");
  const [landSize, setLandSize] = useState("");
  const [crops, setCrops] = useState("");

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    if (!role) navigate("/loginSelection");
  }, [role, navigate]);

  function handleNavigatelogin() {
    navigate("/login");
  }

  async function handleRegister() {
    try {
      const result = await appwriteAccount.createAppwriteAccount(
        email,
        password,
        fullname,
        role
      );

      if (!result?.$id) {
        toast.error("Account creation failed");
        return;
      }

      let imageId = null;

      if (profileImage) {
        const uploaded = await AppwriteStorage.uploadFile(
          APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
          profileImage
        );
        imageId = uploaded.$id;
      }

      const profileData = {
        userId: result.$id,
        fullName: fullname,
        email: email,
        role: role,
        imageId: imageId || "",
      };

      if (role === "FARMER") {
        profileData.location = locationField;
        profileData.landSize = landSize;
        profileData.crops = crops;
      }

      if (role === "CUSTOMER") {
        profileData.address = address;
        profileData.phone = phone;
      }

      if (role === "AGRI_EXPERT") {
        profileData.qualification = qualification;
        profileData.experience = experience;
        profileData.specialization = specialization;
      }

      await appwriteTablesDb.createRow(
        APPWRITE_USERPROFILES_TABLE_ID,
        profileData
      );

      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      toast.error(error.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-white to-emerald-10 p-6">
      <Card className="w-full max-w-md rounded-3xl border border-emerald-500 bg-white shadow-2xl">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-emerald-800">
              Register as{" "}
              <span className="capitalize text-emerald-600">
                {role?.toLowerCase().replace("_", " ")}
              </span>
            </CardTitle>

            <Button
              variant="ghost"
              onClick={handleNavigatelogin}
              className="text-sm text-emerald-700 hover:bg-emerald-50 rounded-full px-4"
            >
              Log In
            </Button>
          </div>

          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-5">
            {/* FULL NAME */}
              <div className="grid gap-1.5">
                <Label htmlFor="fullname">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullname"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>

              {/* EMAIL */}
              <div className="grid gap-1.5">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              <div className="grid gap-1.5">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* PROFILE IMAGE */}
              <div className="grid gap-1.5">
                <Label htmlFor="profileImage">Profile Image</Label>
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              </div>

              {role === "FARMER" && (
                <>
                  <Input
                    required
                    placeholder="Location *"
                    value={locationField}
                    onChange={(e) => setLocationField(e.target.value)}
                  />
                  <Input
                    required
                    placeholder="Land Size *"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                  />
                  <Input
                    required
                    placeholder="Crops *"
                    value={crops}
                    onChange={(e) => setCrops(e.target.value)}
                  />
                </>
              )}

              {role === "CUSTOMER" && (
                <>
                  <Input
                    required
                    placeholder="Address *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Input
                    required
                    placeholder="Phone *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              )}

              {role === "AGRI_EXPERT" && (
                <>
                  <Input
                    placeholder="Qualification *"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Experience *"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <Input
                    placeholder="Specialization *"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  />
                </>
              )}

          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            onClick={handleRegister}
          >
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignupPage;
