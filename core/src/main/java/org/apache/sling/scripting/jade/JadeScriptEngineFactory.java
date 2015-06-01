/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.apache.sling.scripting.jade;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.script.ScriptEngine;

import org.apache.sling.scripting.api.AbstractScriptEngineFactory;

public class JadeScriptEngineFactory extends AbstractScriptEngineFactory {

    /** The extensions of Jade scripts (value is "jade"). */
    public final static String JADE_SCRIPT_EXTENSION = "jade";

    /** The MIME type of FreeMarker script files (value is "text/x-freemarker"). */
    public final static String JADE_MIME_TYPE = "text/x-jade";

    /**
     * The short name of the FreeMarker script engine factory (value is
     * "freemarker").
     */
    public final static String SHORT_NAME = "jade";

    /** The name of the FreeMarker language (value is "Jade"). */
    private static final String JADE_NAME = "Jade";

    /**
     * The absolute path to the jade version properties file (value is
     * "/jade/version.properties").
     */
    private static final String JADE_VERSION_PROPERTIES = "/jade/version.properties";

    /**
     * The name of the property containing the Jade version (value is
     * "version").
     */
    private static final String PROP_JADE_VERSION = "version";

    /**
     * The default version of FreeMarker if the version property cannot be read
     * (value is "2.3", which is the latest minor version release as of
     * 17.Dec.2007).
     */
    private static final String DEFAULT_JADE_VERSION = "1";

    /**
     * The FreeMarker language version extracted from the FreeMarker version
     * properties file. If this file cannot be read the language version
     * defaults to ...
     */
    private final String languageVersion;

    public JadeScriptEngineFactory() {
        setExtensions(JADE_SCRIPT_EXTENSION);
        setMimeTypes(JADE_MIME_TYPE);
        setNames(SHORT_NAME);

        // extract language version from version.properties file
        String langVersion = null;
        InputStream ins = null;
        try {
            ins = getClass().getResourceAsStream(JADE_VERSION_PROPERTIES);
            if (ins != null) {
                Properties props = new Properties();
                props.load(ins);
                langVersion = props.getProperty(PROP_JADE_VERSION);
            }
        } catch (IOException ioe) {
            // don't really care, just use default
        } finally {
            if (ins != null) {
                try {
                    ins.close();
                } catch (IOException ignore) {
                    // ignore
                }
            }
        }

        // if we could not extract the actual version, assume version 2.3
        // which is the current minor release as of 17.Dec.2007
        languageVersion = (langVersion == null)
                ? DEFAULT_JADE_VERSION
                : langVersion;
    }

    public ScriptEngine getScriptEngine() {
        return new JadeScriptEngine(this);
    }

    public String getLanguageName() {
        return JADE_NAME;
    }

    public String getLanguageVersion() {
        return languageVersion;
    }
}
