-- Revoke dangerous permissions and ensure RLS is correctly enforced
REVOKE ALL ON tools FROM anon;
REVOKE ALL ON tools FROM authenticated;
GRANT SELECT ON tools TO anon;
GRANT SELECT ON tools TO authenticated;

-- Force enable RLS and ensure only SELECT is allowed for public

ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- If policies exist, drop and recreate to be sure
DROP POLICY IF EXISTS tools_read_all ON tools;
CREATE POLICY tools_read_all ON tools FOR SELECT USING (true);

DROP POLICY IF EXISTS tool_stats_read_all ON tool_stats;
CREATE POLICY tool_stats_read_all ON tool_stats FOR SELECT USING (true);

DROP POLICY IF EXISTS testimonials_read_approved ON testimonials;
CREATE POLICY testimonials_read_approved ON testimonials FOR SELECT USING (approved = true);

DROP POLICY IF EXISTS testimonials_insert_public ON testimonials;
CREATE POLICY testimonials_insert_public ON testimonials
FOR INSERT WITH CHECK (approved = false AND char_length(name) > 1 AND char_length(message) > 4);

DROP POLICY IF EXISTS contacts_insert_public ON contacts;
CREATE POLICY contacts_insert_public ON contacts
FOR INSERT WITH CHECK (status = 'new' AND position('@' in email) > 1 AND char_length(name) > 1 AND char_length(message) > 4);

DROP POLICY IF EXISTS ratings_insert_public ON ratings;

-- Disallow updates/deletes explicitly (though RLS does this by default if no policy exists)
DROP POLICY IF EXISTS tools_no_update ON tools;
CREATE POLICY tools_no_update ON tools FOR UPDATE USING (false);
DROP POLICY IF EXISTS tools_no_delete ON tools;
CREATE POLICY tools_no_delete ON tools FOR DELETE USING (false);
