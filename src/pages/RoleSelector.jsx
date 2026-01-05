import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

const roles = [
  {
    value: "FARMER",
    title: "Farmer",
    description: "Sell crops and get expert plant advice",
    icon: "🌾",
  },
  {
    value: "BUYER",
    title: "Buyer",
    description: "Buy crops directly from farmers",
    icon: "🛒",
  },
  {
    value: "PLANT_DOCTOR",
    title: "Plant Doctor",
    description: "Provide crop health consultation",
    icon: "🩺",
  },
]

export default function RoleSelector() {
  const navigate = useNavigate()

  const handleSelect = (role) => {
    navigate("/register", {
      state: { role },
    })
  }

  return (
    <div className="flex flex-col items-center space-y-10">
      <h2 className="text-3xl font-medium text-center pt-20">
        Select your role
      </h2>

      <div className="w-full max-w-5xl">
        <RadioGroup className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {roles.map((r) => (
            <Label key={r.value} className="cursor-pointer">
              <Card
                onClick={() => handleSelect(r.value)}
                className="
                  h-full p-6 rounded-xl
                  border bg-background
                  transition-colors
                  hover:border-primary/40
                "
              >
                <RadioGroupItem value={r.value} className="hidden" />

                <div className="flex flex-col items-center text-center gap-4">
                  <div className="text-3xl opacity-80">
                    {r.icon}
                  </div>

                  <div className="text-base font-medium">
                    {r.title}
                  </div>

                  <p className="text-sm text-muted-foreground max-w-55">
                    {r.description}
                  </p>
                </div>
              </Card>
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
