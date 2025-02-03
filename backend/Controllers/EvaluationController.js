import Assignment from "../models/Assignment.js";
import Student from "../models/Student.js";

export const evaluateSubmission = async (req, res) => {
    const { assignmentId, submissionId } = req.params; // Retrieve assignment and submission IDs from params
    const { feedback, grade } = req.body; // Retrieve feedback and grade from request body

    try {
        // Find the assignment
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            console.log("Assignment not found");
            return res.status(404).json({ message: "Assignment not found." });
        }

        // Find the specific submission within the assignment
        const submission = assignment.submissions.id(submissionId);
        if (!submission) {
            console.log("Submission not found");
            return res.status(404).json({ message: "Submission not found." });
        }

        // Update submission feedback, grade, and evaluated status
        submission.feedback = feedback;
        submission.grade = grade;
        submission.evaluated = true;

        // Save the updated assignment
        await assignment.save();

        // Retrieve the student based on the submission's `student` field
        const student = await Student.findById(submission.student);
        if (!student) {
           // console.log("Student not found");
            return res.status(404).json({ message: "Student not found." });
        }

        // Update student's points
        student.points += parseInt(grade, 10); // Add the grade to the student's total points

        // Update the corresponding assignment in the student's `assignments` array
        const studentAssignment = student.assignments.find(
            (assign) =>
                assign.assignment.toString() === assignmentId.toString() &&
                assign.classroomId.toString() === assignment.classroom.toString() // Ensure classroom ID matches
        );

        if (studentAssignment) {
            // Update grade and feedback for the existing assignment entry
            studentAssignment.grade = grade;
            studentAssignment.feedback = feedback;
        } else {
            // If the assignment entry doesn't exist, add a new one
            student.assignments.push({
                assignment: assignmentId,
                classroomId: assignment.classroom, // Assuming `assignment.classroom` stores the classroom ID
                grade: grade,
                feedback: feedback,
            });
        }

        // Save the updated student document
        await student.save();

        res.status(200).json({ message: "Submission evaluated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};
