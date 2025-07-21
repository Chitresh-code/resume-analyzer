import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";

export const meta = () => ([
    { title: 'ResuMind - Wipe App Data' },
    { name: 'description', content: 'Wipe all app data including resumes and feedback' },
]);

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [pdfFiles, setPdfFiles] = useState<FSItem[]>([]);
    const [resumeData, setResumeData] = useState<Resume[]>([]);
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

      useEffect(() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/wipe');
    }, [auth.isAuthenticated])

    useEffect(() => {
        const loadResumes = async () => {
            setLoadingResumes(true);

            const resumes = (await kv.list('resume:*', true)) as KVItem[];

            const parsedResumes = resumes?.map((resume) => (
                JSON.parse(resume.value) as Resume
            ))

            setResumes(parsedResumes || []);
            setLoadingResumes(false);
        }

        loadResumes()
    }, []);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
        // Filter only PDF files for display
        const pdfs = files.filter(file => file.name.toLowerCase().endsWith('.pdf'));
        setPdfFiles(pdfs);

        // Convert PDF files to Resume format for ResumeCard
        const resumeCards: Resume[] = pdfs.map((file) => ({
            id: file.id,
            companyName: file.name.replace('.pdf', ''),
            jobTitle: 'PDF Document - To be deleted',
            imagePath: file.path,
            resumePath: file.path,
            feedback: {
                overallScore: 0,
                ATS: { score: 0, tips: [] },
                toneAndStyle: { score: 0, tips: [] },
                content: { score: 0, tips: [] },
                structure: { score: 0, tips: [] },
                skills: { score: 0, tips: [] }
            }
        }));
        setResumeData(resumeCards);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        // Delete all files (both PDFs and PNGs)
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return (
            <main className="bg-[url('/images/bg-main.svg')] bg-cover">
                <Navbar />
                <section className="main-section">
                    <div className="page-heading py-16">
                        <div className="flex flex-col items-center justify-center">
                            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
                            <h2>Loading...</h2>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main className="bg-[url('/images/bg-main.svg')] bg-cover">
                <Navbar />
                <section className="main-section">
                    <div className="page-heading py-16">
                        <div className="flex flex-col items-center text-center">
                            <h1>Error</h1>
                            <h2>Something went wrong: {error}</h2>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>App Data Management</h1>
                    <h2>Manage your stored resumes and application data</h2>
                </div>

                <div className="gradient-border shadow-lg max-w-4xl w-full">
                    <div className="bg-white rounded-2xl p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-2xl font-semibold">Account Information</h3>
                                <p className="text-dark-200">Authenticated as: <span className="font-medium">{auth.user?.username}</span></p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h3 className="text-2xl font-semibold">Resume Files</h3>
                                <p className="text-dark-200">These PDF files will be deleted.</p>
                                {pdfFiles.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-dark-200">No PDF resume files found</p>
                                    </div>
                                ) : (
                                    <div className="resumes-section">
                                        {!loadingResumes && resumes.length > 0 && (
                                            <div className="resumes-section">
                                            {resumes.map((resume) => (
                                                <ResumeCard key={resume.id} resume={resume} />
                                            ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-4 pt-6 border-t border-gray-200">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-2xl font-semibold text-red-600">Danger Zone</h3>
                                    <p className="text-dark-200">This action will permanently delete:</p>
                                    <ul className="list-disc list-inside text-dark-200 ml-4 space-y-1">
                                        <li>All PDF resume files ({pdfFiles.length} found)</li>
                                        <li>All feedback data and application history</li>
                                        <li>All stored preferences and settings</li>
                                    </ul>
                                    <p className="text-red-600 font-medium mt-2">This action cannot be undone!</p>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-full cursor-pointer transition-colors duration-200"
                                        onClick={() => handleDelete()}
                                    >
                                        Wipe All App Data ({pdfFiles.length} files total)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default WipeApp;