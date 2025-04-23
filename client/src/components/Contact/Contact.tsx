'use client'
import { motion } from "motion/react";
import { GithubIcon, LinkedinIcon, MailIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const Contact = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/20 mb-4">
                        <ArrowRightIcon className="w-3.5 h-3.5 mr-1.5" />
                        Get in Touch
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Connect with the Developer
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl">
                        I&apos;m always open to discussing new projects, opportunities, or sharing insights about this learning project.
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <ContactCard text="Linkedin" link="https://www.linkedin.com/in/karol-janowski-35463925b/" icon={<LinkedinIcon className="w-5 h-5 text-blue-400" />} description="Connect with me on LinkedIn" />
                    <ContactCard text="Mail" link="mailto:karol.jj@icloud.com" icon={<MailIcon className="w-5 h-5 text-blue-400" />} description="Send me an email" />
                    <ContactCard text="Github" link="https://github.com/karoljanowski" icon={<GithubIcon className="w-5 h-5 text-blue-400" />} description="Check out my GitHub" />
                </div>
            </motion.div>
        </div>
    );
};

interface ContactCardProps {
    icon: React.ReactNode;
    text: string;
    description: string;
    link: string;
}

const ContactCard = ({icon, text, description, link}: ContactCardProps) => {
    return (
        <Link href={link} className="flex items-center mb-12 bg-neutral-900 px-4 py-2 rounded-lg gap-4">
            <div className="flex items-center bg-neutral-950 p-4 rounded-lg">
                {icon}
            </div>
            <div className="flex flex-col items-start">
                <p className="text-lg font-bold">{text}</p>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
        </Link>
    );
};


export default Contact;
