import React, { useState, useEffect } from "react";
import {
  Gavel,
  Users,
  CheckCircle,
  XCircle,
  Award,
  Printer,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

// --- JUROR DATA & KEY ---
const jurorData = [
  {
    id: 1,
    pScore: 1,
    pReason:
      "This juror might not be too sympathetic toward the plaintiff who is suing for a large sum of money for a bump on her face when he works hard to provide the necessities for a family of eight.",
    dScore: 5,
    dReason:
      "Juror #1 would be a top choice for the defense because he is a strict family man, and there is nothing to suggest he has anything in common with the plaintiff.",
  },
  {
    id: 2,
    pScore: 5,
    pReason:
      "Juror #2 would understand the necessity of Ms. Caruthers’ looking nice for her career. Also, since her husband is an attorney, she would probably understand the basis of the lawsuit.",
    dScore: 1,
    dReason:
      "Because she is a well-dressed professional woman, she would be inclined to side with the plaintiff.",
  },
  {
    id: 3,
    pScore: 1,
    pReason:
      "While close in age to the plaintiff, her profession and income would not give them much in common. Also, since her mother is a plastic surgeon, she might side with the defendant.",
    dScore: 5,
    dReason:
      "This juror would most likely favor the defendant, who is in the same profession as her mother.",
  },
  {
    id: 4,
    pScore: 1,
    pReason:
      "This juror would probably support his fellow medical professional.",
    dScore: 5,
    dReason:
      "Juror #4 would be a top defense choice because he would probably support his fellow medical professional.",
  },
  {
    id: 5,
    pScore: 1,
    pReason:
      "Juror #5 does not seem to take too much interest in her own physical appearance and therefore probably would not think much of the plaintiff’s case.",
    dScore: 5,
    dReason:
      "There is no evidence that would indicate this juror would not be a good juror for the defense.",
  },
  {
    id: 6,
    pScore: 1,
    pReason:
      "This prospective juror would favor the defendant in this case since they are both medical professionals, and he is also considerably older than the plaintiff.",
    dScore: 5,
    dReason:
      "Since this juror is a dentist, he probably would support the defense.",
  },
  {
    id: 7,
    pScore: 5,
    pReason:
      "Appearance and education would make juror #7 an ideal juror for the plaintiff.",
    dScore: 3,
    dReason:
      "Appearance and education would not make juror #7 a top choice for the defense.",
  },
  {
    id: 8,
    pScore: 3,
    pReason:
      "Because of his profession, he probably would not be a top choice for the plaintiff.",
    dScore: 5,
    dReason:
      "There is no evidence that this would not be an ideal juror for the defense.",
  },
  {
    id: 9,
    pScore: 5,
    pReason:
      "Juror #9’s age, dress and interest in fashion design make her desirable to the plaintiff.",
    dScore: 1,
    dReason:
      "Juror #9’s age, dress and interest in fashion design make her undesirable to the defense.",
  },
  {
    id: 10,
    pScore: 3,
    pReason:
      "Because this juror’s wife is a nurse, he might be cautious of malpractice lawsuits.",
    dScore: 3,
    dReason:
      "Due to the fact this juror has served on a civil jury finding for the plaintiff, the defense would probably pass on him.",
  },
  {
    id: 11,
    pScore: 5,
    pReason:
      "Although considerably older than the plaintiff, juror #11 came to court attractively dressed and has prior jury service finding for the plaintiff.",
    dScore: 1,
    dReason:
      "This juror would not be acceptable to the defense due to the fact she had previously found for the plaintiff in a malpractice lawsuit.",
  },
  {
    id: 12,
    pScore: 3,
    pReason: "This juror doesn’t have much in common with a fashion model.",
    dScore: 3,
    dReason:
      "Because of his youth and occupation, this juror would not be a top pick for the defense.",
  },
  {
    id: 13,
    pScore: 5,
    pReason:
      "Juror #13 is close to the plaintiff’s age, well dressed and has a professional career.",
    dScore: 3,
    dReason:
      "Although a better choice for the plaintiff, this juror would not be undesirable to the defense.",
  },
  {
    id: 14,
    pScore: 3,
    pReason:
      "Age and dress would go against this prospective juror being chosen. The fact the juror was inattentive would also make him questionable.",
    dScore: 3,
    dReason:
      "The inattentiveness of this juror would make the defense skeptical of him, especially since it is a technical case.",
  },
  {
    id: 15,
    pScore: 5,
    pReason:
      "Someone married to a modeling supervisor would likely support the plaintiff.",
    dScore: 1,
    dReason:
      "This juror would be unacceptable to the defense because of his wife’s association with the modeling profession.",
  },
  {
    id: 16,
    pScore: 3,
    pReason:
      "Although close in age to the plaintiff, they do not otherwise appear to have much in common.",
    dScore: 5,
    dReason:
      "This juror’s prior jury duty would indicate likelihood to lean toward supporting the defense.",
  },
  {
    id: 17,
    pScore: 5,
    pReason:
      "Because this juror was previously involved as a plaintiff in a civil case, he would likely favor the plaintiff in this case.",
    dScore: 1,
    dReason:
      "The defense would definitely excuse this juror due to his own lawsuit.",
  },
  {
    id: 18,
    pScore: 3,
    pReason:
      "A forty-nine-year-old mailman who came to court in jeans would not appear to sympathize with the plaintiff.",
    dScore: 3,
    dReason:
      "This juror may not be sympathetic to the plaintiff but because of his recent lawsuit he would also be questionable to the defense.",
  },
  {
    id: 19,
    pScore: 5,
    pReason:
      "Juror #19’s profession would require her to maintain certain standards in her appearance, so she would understand the importance of the plaintiff’s plight. She is also close in age to the plaintiff.",
    dScore: 3,
    dReason:
      "The defense would probably not select this juror, as she is too close in age and is in an occupation where appearance is important.",
  },
  {
    id: 20,
    pScore: 1,
    pReason:
      "Because of this juror’s recently broken engagement and his appearance, he would not be chosen by the plaintiff.",
    dScore: 5,
    dReason:
      "This juror would be selected by the defense because of his casual appearance and the fact his father is in the medical profession.",
  },
  {
    id: 21,
    pScore: 1,
    pReason:
      "A forty-eight-year-old man involved in a messy divorce probably would not support the plaintiff.",
    dScore: 5,
    dReason:
      "The defense would select this juror due to the fact he is in a messy divorce and may not be too sympathetic to the plaintiff.",
  },
  {
    id: 22,
    pScore: 1,
    pReason:
      "This prospective juror is a hardworking family man who could not easily relate to the plaintiff.",
    dScore: 5,
    dReason:
      "This juror would be ideal due to his previous experience as the defendant in a lawsuit.",
  },
  {
    id: 23,
    pScore: 5,
    pReason:
      "Even though juror #23 is older than the plaintiff, her history of finding for the plaintiff on a prior civil case would make her desirable to the plaintiff.",
    dScore: 3,
    dReason:
      "While the juror’s age might make her a possibility for the defense, her previous jury experience would make her questionable.",
  },
  {
    id: 24,
    pScore: 5,
    pReason:
      "As a former Miss Texas, and because she is close in age to the plaintiff, juror #24 would be an ideal choice for the plaintiff.",
    dScore: 3,
    dReason:
      "The defense would probably not want a former beauty queen even though her husband is in the insurance business.",
  },
  {
    id: 25,
    pScore: 1,
    pReason:
      "Although close in age to the plaintiff, this prospective juror would not support that side because of his chosen profession.",
    dScore: 5,
    dReason: "This medical student might be an ideal choice for the defense.",
  },
  {
    id: 26,
    pScore: 1,
    pReason:
      "This juror’s age and profession do not give her commonalities with the plaintiff. Also, because she complained to the judge about serving, she wouldn’t make a good juror.",
    dScore: 1,
    dReason:
      "Juror #26 would not be an ideal juror for the defense because she complained to the judge about serving.",
  },
  {
    id: 27,
    pScore: 5,
    pReason:
      "Because juror #27 recently underwent chemotherapy, she would be sympathetic to the medical problem incurred by the plaintiff.",
    dScore: 1,
    dReason:
      "The defense would definitely not want a juror who had recently suffered due to a misdiagnosis by a physician.",
  },
  {
    id: 28,
    pScore: 3,
    pReason:
      "His age and marital status would tend to make this juror questionable to the plaintiff.",
    dScore: 3,
    dReason:
      "There is insufficient evidence on this juror for the defense to select him.",
  },
  {
    id: 29,
    pScore: 1,
    pReason:
      "This juror’s age, occupation and religion would make him undesirable for the plaintiff.",
    dScore: 5,
    dReason:
      "Juror #29 would be a good choice for the defense, as he has nothing in common with the plaintiff and would possibly be unsympathetic to her cause.",
  },
  {
    id: 30,
    pScore: 5,
    pReason:
      "Juror #30 came to court dressed in a business suit, which indicates he cares about appearance. He is also a professional artist.",
    dScore: 3,
    dReason:
      "Juror #30 would probably not be chosen by the defense due to his profession and his attention to his appearance.",
  },
];

export default function PickTwelveApp() {
  const [view, setView] = useState("intro"); // 'intro', 'playing', 'results', 'certificate'
  const [role, setRole] = useState(null); // 'Plaintiff' or 'Defense'
  const [selectedJurors, setSelectedJurors] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [scoreData, setScoreData] = useState(null);

  // Randomly assign role when starting
  const startGame = () => {
    const assignedRole = Math.random() > 0.5 ? "Plaintiff" : "Defense";
    setRole(assignedRole);
    setSelectedJurors([]);
    setStudentName("");
    setScoreData(null);
    setView("playing");
  };

  const toggleJuror = (id) => {
    if (selectedJurors.includes(id)) {
      setSelectedJurors(selectedJurors.filter((j) => j !== id));
    } else {
      if (selectedJurors.length < 12) {
        setSelectedJurors([...selectedJurors, id]);
      }
    }
  };

  const submitJury = () => {
    let totalScore = 0;
    const details = [];

    // Calculate score based on role
    selectedJurors.forEach((id) => {
      const juror = jurorData.find((j) => j.id === id);
      const points = role === "Plaintiff" ? juror.pScore : juror.dScore;
      const reason = role === "Plaintiff" ? juror.pReason : juror.dReason;

      totalScore += points;
      details.push({ id, points, reason });
    });

    // Sort details by id for cleaner reading
    details.sort((a, b) => a.id - b.id);

    // Determine category message
    let message = "";
    let passed = false;
    if (totalScore >= 60) {
      message = "Excellent job! The 'pros' couldn't have done it better!";
      passed = true;
    } else if (totalScore >= 48) {
      message = "Very good!";
      passed = true;
    } else if (totalScore >= 36) {
      message = "Good, but you might want to reconsider some of your choices.";
      passed = true;
    } else if (totalScore >= 21) {
      message = "Maybe you should go back and make some changes.";
      passed = false;
    } else {
      message = "Start over and try again!";
      passed = false;
    }

    setScoreData({ totalScore, details, message, passed });
    setView("results");
  };

  const handlePrint = () => {
    window.print();
  };

  // --- RENDER FUNCTIONS ---

  const renderIntro = () => (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg text-center border-t-8 border-blue-800">
      <Gavel className="w-16 h-16 mx-auto text-blue-800 mb-4" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Pick Twelve</h1>
      <h2 className="text-xl text-gray-600 mb-8">An Interactive Jury Game</h2>

      <div className="text-left bg-gray-50 p-6 rounded-lg mb-8 shadow-inner text-gray-700 space-y-4">
        <p>
          Welcome to Voir Dire! The justice process really begins with the
          picking of the jury. Attorneys use limited exemptions to remove
          panelists who might be least likely to find for their clients.
        </p>
        <p>
          <strong>Your Case: Caruthers v. Payne (Civil Case)</strong>
          <br />
          Candie Caruthers, a fashion model, is suing Dr. John Payne, a plastic
          surgeon, for lost wages after multiple surgeries failed to heal a
          prominent bump on her face.
        </p>
        <p>
          <strong>Instructions:</strong> Use the Juror Information Document
          provided by your teacher. Read the backgrounds of all 30 prospective
          jurors carefully. When you begin, you will be randomly assigned to
          represent either the Plaintiff (Ms. Caruthers) or the Defense (Dr.
          Payne). Your goal is to select the 12 jurors most likely to favor your
          side!
        </p>
      </div>

      <button
        onClick={startGame}
        className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
      >
        Enter Courtroom & Get Assigned
        <ChevronRight className="ml-2 w-6 h-6" />
      </button>
    </div>
  );

  const renderPlaying = () => (
    <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl shadow-lg border-t-8 border-blue-800 overflow-hidden flex flex-col min-h-[85vh]">
      {/* Header */}
      <div className="bg-gray-100 p-6 border-b flex flex-col md:flex-row justify-between items-center sticky top-0 z-10 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Voir Dire Selection
          </h2>
          <p className="text-lg mt-1">
            You represent the:{" "}
            <span
              className={`font-bold px-3 py-1 rounded text-white ${
                role === "Plaintiff" ? "bg-indigo-600" : "bg-emerald-600"
              }`}
            >
              {role}
            </span>
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="text-center">
            <span className="block text-sm text-gray-500 uppercase font-bold tracking-wider">
              Jurors Selected
            </span>
            <span
              className={`text-3xl font-bold ${
                selectedJurors.length === 12
                  ? "text-green-600"
                  : "text-blue-800"
              }`}
            >
              {selectedJurors.length} / 12
            </span>
          </div>
          <button
            onClick={submitJury}
            disabled={selectedJurors.length !== 12}
            className={`py-3 px-6 rounded-lg font-bold transition-all shadow-md flex items-center ${
              selectedJurors.length === 12
                ? "bg-green-600 hover:bg-green-500 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit Jury
            <CheckCircle className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="p-6 flex-grow overflow-y-auto bg-gray-50">
        <p className="mb-6 text-gray-600 text-center font-medium">
          Review your printed case file and select exactly 12 jurors who will
          favor the {role}.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((id) => {
            const isSelected = selectedJurors.includes(id);
            const isMaxedOut = selectedJurors.length >= 12 && !isSelected;

            return (
              <button
                key={id}
                onClick={() => toggleJuror(id)}
                disabled={isMaxedOut}
                className={`
                  relative p-4 rounded-xl border-2 font-bold flex flex-col items-center justify-center transition-all h-24
                  ${
                    isSelected
                      ? "bg-blue-100 border-blue-600 text-blue-900 shadow-md transform scale-105"
                      : "bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                  }
                  ${
                    isMaxedOut
                      ? "opacity-50 cursor-not-allowed hover:border-gray-200 hover:bg-white"
                      : "cursor-pointer"
                  }
                `}
              >
                <Users
                  className={`w-6 h-6 mb-1 ${
                    isSelected ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                Juror #{id}
                {isSelected && (
                  <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    const { totalScore, details, message, passed } = scoreData;

    return (
      <div className="max-w-4xl mx-auto mt-6 bg-white rounded-xl shadow-lg border-t-8 border-blue-800 overflow-hidden">
        <div className="p-8 text-center border-b bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Voir Dire Results
          </h2>
          <p className="text-xl text-gray-600">
            Representing the{" "}
            <strong
              className={
                role === "Plaintiff" ? "text-indigo-600" : "text-emerald-600"
              }
            >
              {role}
            </strong>
          </p>

          <div className="mt-8 flex justify-center items-center space-x-12">
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500 font-bold">
                Total Score
              </p>
              <p
                className={`text-6xl font-black ${
                  passed ? "text-green-600" : "text-red-500"
                }`}
              >
                {totalScore}{" "}
                <span className="text-2xl text-gray-400 font-normal">/ 60</span>
              </p>
            </div>
          </div>

          <div
            className={`mt-6 p-4 rounded-lg inline-block text-lg font-bold border ${
              passed
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {message}
          </div>
        </div>

        <div className="p-8 bg-white">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            Jury Analysis
          </h3>
          <div className="space-y-4">
            {details.map((j) => (
              <div
                key={j.id}
                className="flex flex-col sm:flex-row bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm"
              >
                <div className="sm:w-32 flex flex-col items-center justify-center border-r border-gray-200 pr-4 mb-4 sm:mb-0">
                  <div className="text-center mb-2">
                    <div className="text-sm text-gray-500 uppercase font-bold">
                      Juror
                    </div>
                    <div className="text-4xl font-black text-gray-800">
                      #{j.id}
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-bold text-white shadow-sm ${
                      j.points === 5
                        ? "bg-green-500"
                        : j.points === 3
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {j.points} Points
                  </div>
                </div>
                <div className="sm:pl-6 flex-1 flex items-center">
                  <p className="text-gray-700">{j.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-gray-50 border-t flex flex-col items-center justify-center space-y-6">
          {passed ? (
            <div className="w-full max-w-md text-center bg-blue-50 p-6 rounded-xl border border-blue-100">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-blue-900 mb-4">
                You Passed the Bar!
              </h4>
              <input
                type="text"
                placeholder="Enter your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 text-center text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={() => {
                  if (studentName.trim().length > 0) setView("certificate");
                  else alert("Please enter your name first!");
                }}
                className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md"
              >
                Claim Certificate
              </button>
            </div>
          ) : (
            <div className="w-full max-w-md text-center bg-red-50 p-6 rounded-xl border border-red-100">
              <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-red-900 mb-2">Mistrial!</h4>
              <p className="text-red-700 mb-6">
                Your score of {totalScore} is below the 36 points required to
                pass. You need to re-examine the jury panel.
              </p>
              <button
                onClick={() => setView("playing")}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md flex justify-center items-center"
              >
                <XCircle className="w-5 h-5 mr-2" />
                Return to Jury Selection
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCertificate = () => (
    <div className="max-w-4xl mx-auto mt-10">
      {/* Hide controls when printing using CSS media queries via Tailwind print classes */}
      <div className="mb-6 flex justify-between print:hidden">
        <button
          onClick={() => setView("results")}
          className="text-blue-800 font-bold hover:underline"
        >
          &larr; Back to Results
        </button>
        <div className="space-x-4">
          <button
            onClick={startGame}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Play Again
          </button>
          <button
            onClick={handlePrint}
            className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow flex items-center inline-flex"
          >
            <Printer className="w-5 h-5 mr-2" />
            Print Certificate
          </button>
        </div>
      </div>

      {/* Certificate Body */}
      <div className="bg-white p-2 border-8 border-double border-blue-900 rounded shadow-2xl relative print:shadow-none print:border-8">
        <div className="border-4 border-blue-100 p-12 text-center relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center">
            <Gavel className="w-96 h-96" />
          </div>

          <div className="relative z-10">
            <Award className="w-20 h-20 text-yellow-500 mx-auto mb-6" />

            <h1 className="text-5xl font-serif font-black text-gray-900 mb-2 uppercase tracking-widest">
              Certificate
            </h1>
            <h2 className="text-2xl font-serif text-gray-600 mb-10 tracking-widest uppercase">
              of Completion
            </h2>

            <p className="text-lg text-gray-600 italic mb-4">
              This is to certify that
            </p>

            <p className="text-4xl font-bold text-blue-900 border-b-2 border-gray-300 inline-block px-10 pb-2 mb-8 min-w-[300px]">
              {studentName}
            </p>

            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
              has successfully completed the <strong>Pick Twelve</strong> Voir
              Dire training module. By acting as Counsel for the{" "}
              <strong>{role}</strong> in the matter of{" "}
              <em>Caruthers v. Payne</em>, they demonstrated critical evaluation
              skills and secured a highly competent jury panel.
            </p>

            <div className="flex justify-center items-center space-x-16 mb-8">
              <div className="text-center">
                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">
                  Official Score
                </p>
                <p className="text-4xl font-black text-gray-800">
                  {scoreData?.totalScore}{" "}
                  <span className="text-xl text-gray-500">/ 60</span>
                </p>
              </div>
              <div className="h-16 w-px bg-gray-300"></div>
              <div className="text-center">
                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">
                  Rating
                </p>
                <p className="text-2xl font-black text-green-700 uppercase">
                  {scoreData?.message.split("!")[0]}!
                </p>
              </div>
            </div>

            <div className="mt-16 flex justify-between items-end px-12">
              <div className="w-48 border-t border-gray-800 pt-2 text-sm text-gray-600 font-bold uppercase tracking-wider">
                Date Completed
                <p className="font-normal text-gray-800 mt-1">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="w-48 border-t border-gray-800 pt-2 text-sm text-gray-600 font-bold uppercase tracking-wider">
                Hon. Presiding Judge
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-200 font-sans text-gray-900 p-4 md:p-8">
      {view === "intro" && renderIntro()}
      {view === "playing" && renderPlaying()}
      {view === "results" && renderResults()}
      {view === "certificate" && renderCertificate()}
    </div>
  );
}
