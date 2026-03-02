import useAuthStore from "@/store/authStore";
import { useState, useRef } from "react";
import AppwriteStorage from "@/src/Appwrite/Storage.Services";
import {
  APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
  APPWRITE_APPOINTMENTS_TABLE_ID,
} from "@/src/Utils/Appwrite/constants.js";
import toast from "react-hot-toast";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import { Functions } from "appwrite";
import client from "@/src/Appwrite/index.js";

const APPWRITE_VOICE_FUNCTION_ID = "69a54d3f003bea0b03d4"; // ✅ Correct Function ID

const AppointmentCard = ({ doctorId, onClose }) => {
  const currentUser = useAuthStore((state) => state.currentUser);

  const [issue, setIssue] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [images, setImages] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [converting, setConverting] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const appwriteTablesDB = new AppwriteTablesDB();
  const functions = new Functions(client);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: "audio/wav" });
        audioChunks.current = [];
        setAudioBlob(blob);

        await convertVoiceToText(blob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch {
      toast.error("Microphone permission denied ❌");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const convertVoiceToText = async (blob) => {
    try {
      setConverting(true);

      const base64String = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result.split(",")[1]);
        };
      });

      const execution = await functions.createExecution(
        APPWRITE_VOICE_FUNCTION_ID,
        JSON.stringify({ audioBase64: base64String })
      );

      console.log("Execution object:", execution);
console.log("Raw responseBody:", execution.responseBody);

if (!execution.responseBody) {
  toast.error("Empty response from function ❌");
  return;
}

const result = JSON.parse(execution.responseBody);

      if (result.success) {
        setIssue(result.transcriptEnglish);
        toast.success("Voice converted to text ✅");
      } else {
        toast.error(result.error || "Voice conversion failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("AI service error ❌");
    } finally {
      setConverting(false);
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!issue.trim()) {
      toast.error("Please describe the issue ❌");
      return;
    }

    try {
      setLoading(true);

      const imageIds = [];
      let audioId = null;

      for (const file of images) {
        const uploaded = await AppwriteStorage.uploadFile(
          APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
          file
        );
        imageIds.push(uploaded.$id);
      }

      if (audioBlob) {
        const audioFile = new File([audioBlob], "voice.wav");
        const uploaded = await AppwriteStorage.uploadFile(
          APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
          audioFile
        );
        audioId = uploaded.$id;
      }

      await appwriteTablesDB.createRow(APPWRITE_APPOINTMENTS_TABLE_ID, {
        farmerId: currentUser.$id,
        farmerName: currentUser.name,
        doctorId,
        issue,
        appointmentDate,
        imageIds,
        audioId,
        status: "pending",
      });

      toast.success("Appointment requested successfully ✅");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Submission failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">
        Book Doctor Appointment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          rows={4}
          placeholder="Describe crop issue..."
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex flex-col gap-2">
          {!recording ? (
            <button
              type="button"
              onClick={startRecording}
              className="bg-blue-600 text-white py-2 rounded"
            >
              🎤 Start Recording
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="bg-red-600 text-white py-2 rounded"
            >
              ⏹ Stop Recording
            </button>
          )}

          {converting && (
            <p className="text-yellow-600 text-sm">
              Converting voice...
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            disabled={loading || converting}
            className="flex-1 bg-emerald-600 text-white py-3 rounded"
          >
            {loading ? "Submitting..." : "Confirm Booking"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 border rounded py-3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentCard;