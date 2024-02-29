import React from 'react';

interface Link {
    title: string;
    url: string;
}

const links: Link[] = [
    { title: 'Future agricultural systems and the role of digitalization for achieving sustainability goals.', url: 'https://link.springer.com/article/10.1007/s13593-022-00792-6' },
    { title: 'Teambuilding bei online teams - vllt was zu warum mein tool gut für teambuilding ist', url: 'https://is.muni.cz/th/q3vyf/Framework_for_enhancing_cooperation_within_virtual_agile_teams.pdf' },
    { title: 'homeoffice oder so', url: 'https://d1wqtxts1xzle7.cloudfront.net/30773631/31-fuhrmann-libre.pdf?1391064299=&response-content-disposition=inline%3B+filename%3DUser_centered_Design_of_Collaborative_Ge.pdf&Expires=1708525778&Signature=RZEITydnlpREdiy2p~uqlQ6-5urQ7boVnrSH-SmINkWIQzBXHJ93mGRFiRlnVJeTSR5HNCmT9x7AS99XpDZ4dNEmGd-hnyR5yvU4Tde7VjkOc-bhOiYhrvnrHAqr5ZBWHrjp~YLlz~uIWVKIz2mBpukx2P7fnuViNCCo981eFHT0xHH8EN~tPvGKtT8fjhICksBVke4Ij5qkpvGEHqtEgKHm4sMHraq4rsuKR32-xIfUPaaJAORei40Q4McxBLZJq48IZrXSvnOROVcmQtlCYt--KKrLWSU7GUpXFuLHQScy3ziw3AqqrZaOx4DoeGE1m5zBzp53hsRrh89TSn49tA__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA' },
    { title: 'buch zu corona und lernen in schulen usw', url: 'https://books.google.de/books?hl=de&lr=&id=X3BgEAAAQBAJ&oi=fnd&pg=PA135&dq=%22agil%22+AND+%22virtual%22+AND+%22face+to+face%22+AND+%22hybrid%22&ots=nW1fwjzPyz&sig=ELHEIUqJk7_1AXUcthBa34fGruM&redir_esc=y#v=onepage&q&f=false' },
    { title: 'Work-from-home impacts on software project: A global study on software development practices and stakeholder perceptions', url: 'https://onlinelibrary.wiley.com/doi/full/10.1002/spe.3306' },
    { title: 'x', url: '' },
    { title: 'x', url: '' },
];

const LinkList: React.FC = () => {
    return (
        <div className='mt-40'>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Links</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {links.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <a href={link.url} style={{ textDecoration: 'none', color: 'blue' }}>{link.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LinkList;