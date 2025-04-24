import React, { useEffect } from "react";
import Swal from "sweetalert2";
import img from "../../../assets/JUST_logo_transparent.png";
import GetUserInfo from "../../../utils/GetUserInfo";
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#D6F0F4",
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  logo: {
    width: 70,
    height: 50,
  },
  universityName: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "gray",
    paddingTop: 10,
  },
  center: {
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
});

// 🔧 Component for generating PDF content
const StudentIDCardPDF = ({ user, cardNumber, today }) => (
  <Document>
    <Page size={[360, 300]} style={styles.page}>
      <View style={styles.header}>
        <Image src={img} style={styles.logo} />
        <Text style={styles.universityName}>
          Jashore University of Science & Technology
        </Text>
      </View>

      <View style={styles.userInfo}>
        <View>
          <Text style={styles.bold}>{user?.Name}</Text>
          <Text>Department: {user?.Department}</Text>
          <Text>Roll No: {user?.StdID}</Text>
        </View>
        <Image src={user?.Image} style={styles.image} />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.bold, styles.center]}>Student ID Card</Text>
        <Text style={styles.center}>Card No: {cardNumber}</Text>
        <Text style={[styles.center, { marginTop: 10 }]}>
          "Issued by Jessore Science & Technology University"
        </Text>
        <View
          style={{
            marginTop: 21,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{borderTop :1 }}>Student's Signature</Text>
          <Text>Date: {today}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

// 🔧 Main Card component
const Card = () => {
  const user = GetUserInfo();
  const currentUser = user[0];

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };
  const today = getCurrentDate();

  const generateCardNumber = (stdID) => {
    let hash = 0;
    for (let i = 0; i < stdID.length; i++) {
      hash = stdID.charCodeAt(i) + ((hash << 5) - hash);
    }
    const num = Math.abs(hash % 10000); // 4-digit number
    return num.toString().padStart(4, "0");
  };

  const cardNumber = generateCardNumber(currentUser?.StdID || "");

  useEffect(() => {
    Swal.fire("SweetAlert2 is working!");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <div className="bg-[#D6F0F4] p-5 rounded-lg shadow-lg w-[500px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <img src={img} alt="University Logo" className="w-[70px] h-16" />
          <h3 className="text-[22px] font-bold font-oswald">
            Jashore University of Science & Technology
          </h3>
        </div>

        {/* Student Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{currentUser?.Name}</h3>
            <p className="text-sm">Department: {currentUser?.Department}</p>
            <p className="text-sm">Roll No: {currentUser?.StdID}</p>
          </div>
          <img
            src={currentUser?.Image}
            alt="User"
            className="w-20 h-20 object-cover"
          />
        </div>

        <div className="border-t-2 border-gray-400 my-2"></div>

        {/* Footer */}
        <div className="text-sm">
          <p className="font-semibold mb-2">Student ID Card</p>
          <p className="text-center">Card No: {cardNumber}</p>
          <div className="text-center mt-4">
            <p className="italic">
              "Issued by Jessore Science & Technology University"
            </p>
          </div>
          <div className="mt-10 flex justify-between">
            <p className="border-black border-t-[1px]">
              Student's Signature
            </p>
            <p className="font-semibold">Date: {today}</p>
          </div>
        </div>
      </div>

      {/* PDF Download Button */}
      {currentUser && (
        <PDFDownloadLink
          document={
            <StudentIDCardPDF
              user={currentUser}
              cardNumber={cardNumber}
              today={today}
            />
          }
          fileName={`${currentUser?.StdID}_ID_Card.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <button className="bg-gray-400 text-white px-4 py-2 rounded">
                Loading PDF...
              </button>
            ) : (
              <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
                Download ID Card as PDF
              </button>
            )
          }
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default Card;
