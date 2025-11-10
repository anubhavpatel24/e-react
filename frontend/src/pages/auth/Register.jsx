const register = async (name, email, password) => {
  try {
    const res = await fetch("https://e-react-dc29.vercel.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    // backend success key ka name kuch bhi ho sakta hai
    // so normalize response

    if (res.ok && (data.success === true || data.status === "success")) {
      return { success: true };
    } else {
      return { success: false, error: data.message || data.error || "Registration Failed" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};
