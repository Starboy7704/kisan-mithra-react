const Profile = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">👤 Doctor Profile</h2>

      <p><strong>Name:</strong> Dr. Sharma</p>
      <p><strong>Specialization:</strong> Crop Disease</p>
      <p><strong>Experience:</strong> 10 years</p>

      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
